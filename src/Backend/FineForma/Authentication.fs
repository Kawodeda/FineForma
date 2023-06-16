module FineForma.Authentication

open System
open System.Text
open System.IdentityModel.Tokens.Jwt
open System.Security.Claims
open Microsoft.AspNetCore.Http
open Microsoft.IdentityModel.Tokens
open Giraffe
open FineFormaCore.ResultBuilder
open HttpUtils
open DataContext
open Security
open Requests
open Validation
open Data

let secret = "kawodedabibokf#CQRSXXXZZZqwertz"

let cookieKey = ".FineForma.Authentication.Token"

type User = { Name: string }

let private generateToken (user: User) =
    let claims = [| Claim(JwtRegisteredClaimNames.Name, user.Name) |]

    let expires = DateTime.UtcNow.AddHours(1)
    let notBefore = DateTime.UtcNow
    let securityKey = SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))

    let signingCredentials =
        SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)

    let token =
        JwtSecurityToken(
            issuer = "fine-forma",
            audience = "fine-forma-client",
            claims = claims,
            expires = expires,
            notBefore = notBefore,
            signingCredentials = signingCredentials
        )

    JwtSecurityTokenHandler().WriteToken(token)

let private ensureUserDoesNotExist (dataCtx: DataContext) (request: SignUpRequest) =
    if userExists dataCtx request.Username then
        Error $"User with username '{request.Username}' already exists"
    else
        Ok request

let private registredUser (request: SignUpRequest) : DbRecords.User =
    let (password, salt) = hashPassword request.Password

    {
        Id = 0
        Username = request.Username
        Password = password
        Salt = salt
        RegistrationDate =
            DateTime.Now
            |> DateOnly.FromDateTime
    }

let private authenticate (dataCtx: DataContext) (request: LogInRequest) =
    let user = findUser dataCtx request.Username

    match user with
    | None -> Error $"User {request.Username} does not exist"
    | Some u ->
        if validatePassword request.Password u.Salt u.Password then
            Ok u
        else
            Error "Incorrect password"

let private userFromDb (request: DbRecords.User) = { Name = request.Username }

let private addTokenToCookes (cookies: IResponseCookies) (token: string) =
    cookies.Append(cookieKey, token, CookieOptions(MaxAge = TimeSpan.FromHours(1)))

let signUp (ctx: UnauthorizedContext) (request: SignUpRequest) =
    request
    |> validateSignUp
    >>= ensureUserDoesNotExist ctx.DataContext
    >>>= registredUser
    >>>= createUser ctx.DataContext

let logIn (cookies: IResponseCookies) (ctx: UnauthorizedContext) (request: LogInRequest) =
    request
    |> validateLogIn
    >>= authenticate ctx.DataContext
    >>>= userFromDb
    >>>= generateToken
    >>>= addTokenToCookes cookies

let logOut (next: HttpFunc) (ctx: HttpContext) =
    ctx.Response.Cookies.Delete cookieKey

    noContent next ctx

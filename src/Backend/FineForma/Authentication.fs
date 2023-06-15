module FineForma.Authentication

open System
open System.Text
open System.IdentityModel.Tokens.Jwt
open Microsoft.AspNetCore.Http
open Microsoft.IdentityModel.Tokens
open Giraffe
open FineForma.HttpUtils
open System.Security.Claims

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

let login (next: HttpFunc) (ctx: HttpContext) =
    task {
        let! user = ctx.BindJsonAsync<User>()
        let token = generateToken user

        ctx.Response.Cookies.Append(cookieKey, token, CookieOptions(MaxAge = TimeSpan.FromHours(1)))

        return! noContent next ctx
    }

let logout (next: HttpFunc) (ctx: HttpContext) =
    ctx.Response.Cookies.Delete cookieKey

    noContent next ctx

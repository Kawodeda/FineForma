module FineForma.Authentication

open System.Text
open System.IdentityModel.Tokens.Jwt
open Microsoft.IdentityModel.Tokens
open System

let secret = "kawodedabibokf#CQRSXXXZZZqwertz"

let cookieId = ".FineForma.Authentication.Token"

type User = { Name: string }

let generateToken (user: User) =
    let expires = DateTime.UtcNow.AddHours(1)
    let notBefore = DateTime.UtcNow
    let securityKey = SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))

    let signingCredentials =
        SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)

    let token =
        JwtSecurityToken(
            issuer = "fine-forma",
            audience = "foo",
            expires = expires,
            notBefore = notBefore,
            signingCredentials = signingCredentials
        )

    JwtSecurityTokenHandler().WriteToken(token)

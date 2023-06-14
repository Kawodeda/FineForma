module FineForma.Middlewares

open System
open Microsoft.AspNetCore.Http

let authenticationCookieMiddleware (ctx: HttpContext) (next: RequestDelegate) =
    let token = ctx.Request.Cookies[Authentication.cookieId]

    if not (String.IsNullOrWhiteSpace token) then
        ctx.Request.Headers.Add("Authorization", $"Bearer {token}")

    next.Invoke ctx

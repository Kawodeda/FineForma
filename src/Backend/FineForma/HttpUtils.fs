module FineForma.HttpUtils

open System.Threading.Tasks
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Authentication.JwtBearer
open Giraffe
open FineFormaCore.MaybeBuilder
open FineForma.Configuration

type UnauthorizedContext = { StoragePath: string }

type AuthorizedContext = {
    StoragePath: string
    Username: string
}

type RequestContext =
    | AuthorizedContext of AuthorizedContext
    | UnauthorizedContext of UnauthorizedContext

let context (ctx: HttpContext) =
    if ctx.User.Identity.IsAuthenticated then
        AuthorizedContext {
            StoragePath = Settings.FileStoragePath
            Username = ctx.User.Identity.Name
        }
    else
        UnauthorizedContext { StoragePath = Settings.FileStoragePath }

let authorizedContext (ctx: HttpContext) =
    match context ctx with
    | AuthorizedContext authorizedCtx -> Some authorizedCtx
    | _ -> None

let success (data: 'a) (next: HttpFunc) (ctx: HttpContext) = json data next ctx

let created (next: HttpFunc) (ctx: HttpContext) = setStatusCode 201 next ctx

let noContent (next: HttpFunc) (ctx: HttpContext) = setStatusCode 204 next ctx

let badRequest (next: HttpFunc) (ctx: HttpContext) = setStatusCode 400 next ctx

let unauthorized (next: HttpFunc) (ctx: HttpContext) = setStatusCode 401 next ctx

let forbidden (next: HttpFunc) (ctx: HttpContext) = setStatusCode 403 next ctx

let notFound (next: HttpFunc) (ctx: HttpContext) = setStatusCode 404 next ctx

let error (err: 'a) (next: HttpFunc) (ctx: HttpContext) =
    (setStatusCode 500
     >=> json err)
        next
        ctx

let authenticate: HttpFunc -> HttpContext -> HttpFuncResult =
    requiresAuthentication (challenge JwtBearerDefaults.AuthenticationScheme)

let private bindAuthorizedRequest
    (request: 'a option)
    (handler: AuthorizedContext -> 'a -> Task<HttpFunc -> HttpContext -> HttpFuncResult>)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    (authenticate
     >=> fun n c ->
         task {
             let result =
                 maybe {
                     let! ctx = authorizedContext c
                     let! request = request

                     return handler ctx request
                 }

             match result with
             | None -> return! badRequest n c
             | Some a ->
                 let! b = a
                 return! b n c
         })
        next
        httpContext

let bindAuthorized
    (requestParser: HttpContext -> 'a option)
    (handler: AuthorizedContext -> 'a -> Task<HttpFunc -> HttpContext -> HttpFuncResult>)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    let request = requestParser httpContext
    bindAuthorizedRequest request handler next httpContext

let bindAuthorizedSync
    (requestParser: HttpContext -> 'a option)
    (handler: AuthorizedContext -> 'a -> HttpFunc -> HttpContext -> HttpFuncResult)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    bindAuthorized
        requestParser
        (fun ctx request ->
            handler ctx request
            |> Task.FromResult)
        next
        httpContext


let bindAuthorizedWithAsyncRequest
    (requestParser: HttpContext -> Task<'a option>)
    (handler: AuthorizedContext -> 'a -> Task<HttpFunc -> HttpContext -> HttpFuncResult>)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    task {
        let! request = requestParser httpContext

        return! bindAuthorizedRequest request handler next httpContext
    }

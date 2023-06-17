module FineForma.HttpUtils

open System.Threading.Tasks
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Authentication.JwtBearer
open Giraffe
open FineFormaCore.Maybe
open FineFormaCore.Result
open Configuration
open DataContext

type User = {
    Id: int
    Username: string
}

type UnauthorizedContext = {
    StoragePath: string
    DataContext: DataContext
}

type AuthorizedContext = {
    StoragePath: string
    DataContext: DataContext
    User: User
}

type RequestContext =
    | AuthorizedContext of AuthorizedContext
    | UnauthorizedContext of UnauthorizedContext

let subClaimType =
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"

let context (ctx: HttpContext) =
    if ctx.User.Identity.IsAuthenticated then
        let idClaim = ctx.User.FindFirst(subClaimType)

        AuthorizedContext {
            StoragePath = Settings.FileStoragePath
            DataContext = ctx.GetService<DataContext>()
            User = {
                Id = int (idClaim.Value)
                Username = ctx.User.Identity.Name
            }
        }
    else
        UnauthorizedContext {
            StoragePath = Settings.FileStoragePath
            DataContext = ctx.GetService<DataContext>()
        }

let authorizedContext (ctx: HttpContext) =
    match context ctx with
    | AuthorizedContext authorizedCtx -> Some authorizedCtx
    | _ -> None

let success (data: 'a) (next: HttpFunc) (ctx: HttpContext) =
    let u = typeof<unit>

    match typeof<'a> with
    | u when u = typeof<unit> -> text "" next ctx
    | _ -> json data next ctx

let created (next: HttpFunc) (ctx: HttpContext) = setStatusCode 201 next ctx

let noContent (next: HttpFunc) (ctx: HttpContext) = setStatusCode 204 next ctx

let badRequest (next: HttpFunc) (ctx: HttpContext) = setStatusCode 400 next ctx

let badRequestWithData (data: 'a) (next: HttpFunc) (ctx: HttpContext) =
    (setStatusCode 400
     >=> json data)
        next
        ctx

let unauthorized (next: HttpFunc) (ctx: HttpContext) = setStatusCode 401 next ctx

let forbidden (next: HttpFunc) (ctx: HttpContext) = setStatusCode 403 next ctx

let notFound (next: HttpFunc) (ctx: HttpContext) = setStatusCode 404 next ctx

let error (err: 'a) (next: HttpFunc) (ctx: HttpContext) =
    (setStatusCode 500
     >=> json err)
        next
        ctx

let toStorageResponse f result =
    match result with
    | StorageUtils.Ok a -> f a
    | StorageUtils.NotFound -> notFound
    | StorageUtils.Error err -> error err

let toResponse fOk fErr result =
    match result with
    | Ok a -> fOk a
    | Error err -> fErr err

let handlerToResponse fErr (next: HttpFunc) (httpContext: HttpContext) handler =
    match handler with
    | Ok a -> a next httpContext
    | Error err -> fErr err

let authenticate: HttpFunc -> HttpContext -> HttpFuncResult =
    requiresAuthentication (challenge JwtBearerDefaults.AuthenticationScheme)

let private bindAuthorizedRequest
    (request: 'a option)
    (handler: AuthorizedContext -> 'a -> Task<HttpFunc -> HttpContext -> HttpFuncResult>)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    (authenticate
     >=> fun (n: HttpFunc) (c: HttpContext) ->
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

let bindAuthorizedSyncRequest
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


let bindAuthorizedAsyncRequest
    (requestParser: HttpContext -> Task<'a option>)
    (handler: AuthorizedContext -> 'a -> Task<HttpFunc -> HttpContext -> HttpFuncResult>)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    task {
        let! request = requestParser httpContext

        return! bindAuthorizedRequest request handler next httpContext
    }

let bindAuthorizedSync
    (handler: AuthorizedContext -> HttpFunc -> HttpContext -> HttpFuncResult)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    (authenticate
     >=> (fun (n: HttpFunc) c ->
         authorizedContext c
         |> fromOption ""
         >>>= handler
         |> handlerToResponse (fun str -> unauthorized n c) next httpContext))
        next
        httpContext

let private parseJson<'a, 'err> (httpContext: HttpContext) =
    task {
        try
            let! data = httpContext.BindJsonAsync<'a>()

            return
                if data :> obj = null then
                    Error Unchecked.defaultof<'err>
                else
                    Ok data
        with exn ->
            return Error Unchecked.defaultof<'err>
    }

let bindBody (handler: UnauthorizedContext -> 'a -> Result<'b, 'err>) (next: HttpFunc) (httpContext: HttpContext) =
    task {
        let dataCtx = httpContext.GetService<DataContext>()

        let ctx = {
            StoragePath = Settings.FileStoragePath
            DataContext = dataCtx
        }

        let! request = parseJson<'a, 'err> httpContext

        return!
            match
                request
                >>= handler ctx
            with
            | Ok a -> success a next httpContext
            | Error err -> badRequestWithData err next httpContext
    }

let bindBodyWithCookies
    (handler: IResponseCookies -> UnauthorizedContext -> 'a -> Result<'b, 'err>)
    (next: HttpFunc)
    (httpContext: HttpContext)
    =
    bindBody (handler httpContext.Response.Cookies) next httpContext

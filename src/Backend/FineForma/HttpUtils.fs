module FineForma.HttpUtils

open Microsoft.AspNetCore.Http
open Giraffe

let success (next: HttpFunc) (ctx: HttpContext) (data: 'a) = json data next ctx

let created (next: HttpFunc) (ctx: HttpContext) = setStatusCode 201 next ctx

let noContent (next: HttpFunc) (ctx: HttpContext) = setStatusCode 204 next ctx

let unauthorized (next: HttpFunc) (ctx: HttpContext) = setStatusCode 401 next ctx

let forbidden (next: HttpFunc) (ctx: HttpContext) = setStatusCode 403 next ctx

let notFound (next: HttpFunc) (ctx: HttpContext) = setStatusCode 404 next ctx

let error (next: HttpFunc) (ctx: HttpContext) (err: 'a) =
    (setStatusCode 500
     >=> json err)
        next
        ctx

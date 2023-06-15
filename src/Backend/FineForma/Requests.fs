module FineForma.Requests

open System
open Microsoft.AspNetCore.Http
open Giraffe
open FineFormaCore.Domain.Design

type ListDesignsRequest = { StoragePath: string }

type LoadDesignRequest = { Name: string }

type SaveDesignRequest = {
    Name: string
    Design: Design
}

type DeleteDesignRequest = { Name: string }

let parseLoadDesignRequest (ctx: HttpContext) : LoadDesignRequest option =
    let name =
        ctx.Request.Query["name"]
        |> string

    if String.IsNullOrWhiteSpace name then
        None
    else
        Some { Name = name }

let parseSaveDesignRequest (ctx: HttpContext) =
    task {
        let name =
            ctx.Request.Query["name"]
            |> string

        let! design = ctx.BindJsonAsync<Design>()

        return
            if String.IsNullOrWhiteSpace name then
                None
            else
                Some {
                    Name = name
                    Design = design
                }
    }

let parseDeleteDesignRequest (ctx: HttpContext) : DeleteDesignRequest option =
    let name =
        ctx.Request.Query["name"]
        |> string

    if String.IsNullOrWhiteSpace name then
        None
    else
        Some { Name = name }

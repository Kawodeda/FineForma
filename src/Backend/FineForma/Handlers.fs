module FineForma.Handlers

open Microsoft.AspNetCore.Http
open Giraffe
open FineFormaCore.Domain.Design
open FineForma.HttpUtils
open FineForma.StorageUtils

let loadDesign (storage: string) (name: string) (next: HttpFunc) (ctx: HttpContext) =
    task {
        let! designResult = Storage.loadDesign storage name

        return!
            match designResult with
            | Ok design ->
                design
                |> success next ctx
            | NotFound -> notFound next ctx
            | Error err ->
                err
                |> error next ctx
    }


let saveDesign (storage: string) (name: string) (next: HttpFunc) (ctx: HttpContext) =
    task {
        let! design = ctx.BindJsonAsync<Design>()
        let! result = Storage.saveDesign storage design name

        return!
            match result with
            | Ok() -> created next ctx
            | NotFound -> notFound next ctx
            | Error err -> error next ctx err
    }

let deleteDesign (storage: string) (name: string) (next: HttpFunc) (ctx: HttpContext) =
    match Storage.deleteDesign storage name with
    | Ok() -> noContent next ctx
    | NotFound -> notFound next ctx
    | Error err -> error next ctx err

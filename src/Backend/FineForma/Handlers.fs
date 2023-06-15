module FineForma.Handlers

open FineForma.HttpUtils
open FineForma.StorageUtils
open FineForma.Requests

let private toResponse f result =
    match result with
    | Ok a -> f a
    | NotFound -> notFound
    | Error err -> error err

let loadDesign (ctx: AuthorizedContext) (request: LoadDesignRequest) =
    task {
        let! designResult = Storage.loadDesign ctx.StoragePath ctx.Username request.Name

        return
            designResult
            |> toResponse success
    }


let saveDesign (ctx: AuthorizedContext) (request: SaveDesignRequest) =
    task {
        let! result = Storage.saveDesign ctx.StoragePath ctx.Username request.Design request.Name

        return
            result
            |> toResponse (fun _ -> created)
    }

let deleteDesign (ctx: AuthorizedContext) (request: DeleteDesignRequest) =
    request.Name
    |> Storage.deleteDesign ctx.StoragePath ctx.Username
    |> toResponse (fun _ -> noContent)

module FineForma.Storage

open FineForma.StorageUtils
open FineFormaCore.Domain.Design

let designFileExtension = "ffd"

let private designPath storage id =
    [| storage; $"{id}.{designFileExtension}" |]
    |> System.IO.Path.Combine

let saveDesign (storage: string) (design: Design) =
    (design
     |> storageId
     |> designPath storage,
     design
     |> Json.serialize)
    ||> FileStorage.writeText

let loadDesign (storage: string) (id: string) =
    async {
        let! result =
            id
            |> designPath storage
            |> FileStorage.readText

        return
            match result with
            | Ok content ->
                content
                |> Json.deserialize<Design>
            | Error exn -> Error exn
    }

let deleteDesign (storage: string) (id: string) =
    id
    |> designPath storage
    |> FileStorage.deleteFile

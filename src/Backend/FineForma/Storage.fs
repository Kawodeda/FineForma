module FineForma.Storage

open FineFormaCore.Domain.Design
open FineForma.StorageUtils

let designFileExtension = "ffd"

let private filePath (storage: string) (id: StorageUtils.Id) =
    [| storage; $"{id}.{designFileExtension}" |]
    |> System.IO.Path.Combine

let saveDesign (storage: string) (design: Design) (name: string) =
    (name
     |> storageId
     |> filePath storage,
     design
     |> Json.serialize)
    ||> FileStorage.writeText

let loadDesign (storage: string) (name: string) =
    async {
        let! result =
            name
            |> storageId
            |> filePath storage
            |> FileStorage.readText

        return
            match result with
            | Ok content ->
                match Json.deserialize<Design> content with
                | Result.Ok design -> Ok design
                | Result.Error exn -> Error exn
            | NotFound -> NotFound
            | Error exn -> Error exn
    }

let deleteDesign (storage: string) (name: string) =
    name
    |> storageId
    |> filePath storage
    |> FileStorage.deleteFile

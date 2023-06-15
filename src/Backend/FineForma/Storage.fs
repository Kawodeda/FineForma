module FineForma.Storage

open FineFormaCore.Domain.Design
open FineForma.StorageUtils

let designFileExtension = "ffd"

let private designStorage (storage: string) =
    System.IO.Path.Combine [| storage; "Designs" |]

let private storageId (username: string) (resourceName: string) =
    [ username; resourceName ]
    |> String.concat "-"
    |> StorageUtils.storageId

let private filePath (storage: string) (id: StorageUtils.Id) =
    [| storage; $"{id}.{designFileExtension}" |]
    |> System.IO.Path.Combine

let saveDesign (storage: string) (username: string) (design: Design) (name: string) =
    (name
     |> storageId username
     |> (designStorage
         >> filePath)
         storage,
     design
     |> Json.serialize)
    ||> FileStorage.writeText

let loadDesign (storage: string) (username: string) (name: string) =
    async {
        let! result =
            name
            |> storageId username
            |> (designStorage
                >> filePath)
                storage
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

let deleteDesign (storage: string) (username: string) (name: string) =
    name
    |> storageId username
    |> (designStorage
        >> filePath)
        storage
    |> FileStorage.deleteFile

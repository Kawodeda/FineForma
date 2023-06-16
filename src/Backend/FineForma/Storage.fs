module FineForma.Storage

open System.Threading.Tasks
open FineFormaCore.Domain.Design
open FineFormaCore.Result

let designFileExtension = "ffd"

let private designStorage (storage: string) =
    System.IO.Path.Combine [| storage; "Designs" |]

let storageId (username: string) (resourceName: string) =
    [ username; resourceName ]
    |> String.concat "-"
    |> StorageUtils.storageId

let private filePath (id: StorageUtils.Id) (storage: string) =
    [| storage; $"{id}.{designFileExtension}" |]
    |> System.IO.Path.Combine

let private ensureStorageCreated (storage: string) =
    FileStorage.createDirectory storage
    >>>= (fun _ -> storage)

let saveDesign (storage: string) (username: string) (design: Design) (name: string) =
    async {
        return!
            match
                (storage
                 |> designStorage
                 |> ensureStorageCreated
                 >>>= ignore)
            with
            | Error err ->
                Error err
                |> Task.FromResult
                |> Async.AwaitTask
            | Ok() ->
                ((filePath (storageId username name) (designStorage storage),
                  design
                  |> Json.serialize)
                 ||> FileStorage.writeText)
    }

let loadDesign (storage: string) (storageId: string) =
    async {
        let! result =
            designStorage storage
            |> filePath storageId
            |> FileStorage.readText

        return
            match result with
            | Ok content ->
                match Json.deserialize<Design> content with
                | Ok design -> Ok design
                | Error exn -> Error exn.Message
            | Error err -> Error err
    }

let deleteDesign (storage: string) (storageId: string) =
    designStorage storage
    |> filePath storageId
    |> FileStorage.deleteFile

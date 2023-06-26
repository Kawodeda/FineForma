module FineForma.Storage

open System.IO
open System.Threading.Tasks
open FineFormaCore.Domain.Design
open FineFormaCore.Result
open System
open System.Text

let designFileExtension = "ffd"

let private designStorage (storage: string) =
    System.IO.Path.Combine [| storage; "Designs" |]

let private imageStorage (storage: string) =
    System.IO.Path.Combine [| storage; "Images" |]

let storageId (username: string) (resourceName: string) =
    [ username; resourceName ]
    |> String.concat "-"
    |> StorageUtils.storageId

let private designFilePath (id: StorageUtils.Id) (storage: string) =
    [| storage; $"{id}.{designFileExtension}" |]
    |> System.IO.Path.Combine

let private imageFilePath (id: string) (storage: string) =
    System.IO.Path.Combine [| storage; id |]

let private imageId (name: string) (content: Stream) =
    Array.concat [
        BitConverter.GetBytes(content.Length)
        (name
         |> Encoding.ASCII.GetBytes)
    ]
    |> StorageUtils.md5

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
                ((designFilePath (storageId username name) (designStorage storage),
                  design
                  |> Json.serialize)
                 ||> FileStorage.writeText)
    }

let loadDesign (storage: string) (storageId: string) =
    async {
        let! result =
            designStorage storage
            |> designFilePath storageId
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
    |> designFilePath storageId
    |> FileStorage.deleteFile

let saveImage (storage: string) (name: string) (image: Stream) =
    async {
        return!
            match
                (storage
                 |> imageStorage
                 |> ensureStorageCreated
                 >>>= ignore)
            with
            | Error err ->
                Error err
                |> Task.FromResult
                |> Async.AwaitTask
            | Ok() ->
                async {
                    let storageId = imageId name image

                    let! result =
                        FileStorage.write
                            (storage
                             |> imageStorage
                             |> imageFilePath storageId)
                            image

                    return
                        result
                        >>>= (fun _ -> storageId)
                }
    }

let loadImage (storage: string) (name: string) =
    imageStorage storage
    |> imageFilePath name
    |> FileStorage.read

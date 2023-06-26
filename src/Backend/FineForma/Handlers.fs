module FineForma.Handlers

open System
open FineFormaCore.Maybe
open FineFormaCore.Result
open HttpUtils
open Requests
open Data
open DataContext
open System.Threading.Tasks
open Microsoft.AspNetCore.Http
open Giraffe
open Microsoft.AspNetCore.Http.Features
open System.Threading

let private savedDesignSource (dataCtx: DataContext) (userId: int) (designName: string) =
    maybe {
        let! savedDesign = findUsersSavedDesignWithName dataCtx userId designName
        let! storageId = getSavedDesignSource dataCtx savedDesign.Id

        return storageId
    }

let designInfo (design: DbRecords.Design) (storedResource: DbRecords.StoredResource) = {|
    Name = storedResource.Name
    LastModified = design.LastEdited
|}

let toDesignInfo (dataCtx: DataContext) (designs: DbRecords.Design list) =
    designs
    |> List.map (getStoredResource dataCtx)
    |> List.map2 designInfo designs


let listDesigns (ctx: AuthorizedContext) =
    listUserDesigns ctx.DataContext ctx.User.Id
    >>>= Seq.toList
    >>>= toDesignInfo ctx.DataContext
    |> toResponse success badRequestWithData

let loadDesign (ctx: AuthorizedContext) (request: LoadDesignRequest) =
    task {
        let! result =
            match
                savedDesignSource ctx.DataContext ctx.User.Id request.Name
                |> fromOption "Not found"
            with
            | Error err ->
                Error err
                |> Task.FromResult
                |> Async.AwaitTask
            | Ok storageId -> Storage.loadDesign ctx.StoragePath storageId

        return
            result
            |> toResponse success (fun _ -> notFound)
    }

let private saveToDb (ctx: AuthorizedContext) (request: SaveDesignRequest) =
    let storageId = Storage.storageId ctx.User.Username request.Name

    if userHasSavedDesign ctx.DataContext ctx.User.Id storageId then
        ()
    else
        let storedResourceId =
            saveStoredResource ctx.DataContext {
                StorageId = storageId
                Name = request.Name
                Thumbnail = [||]
            }

        let designId =
            match findDesignWithStorageId ctx.DataContext storageId with
            | None ->
                saveDesign ctx.DataContext {
                    Source = storedResourceId
                    LastEdited = DateTime.UtcNow
                }
            | Some design -> design.Id


        createSavedDesign ctx.DataContext {
            User = ctx.User.Id
            Design = designId
        }
        |> ignore

let saveDesign (ctx: AuthorizedContext) (request: SaveDesignRequest) =
    task {
        let! result = Storage.saveDesign ctx.StoragePath ctx.User.Username request.Design request.Name

        return
            result
            >>>= (fun _ -> saveToDb ctx request)
            |> toResponse (fun _ -> created) (fun err -> error err)
    }

let private bindUnit f _ = f

let private deleteDesignFromDb (dataCtx: DataContext) (storageId: string) _ =
    findDesignWithStorageId dataCtx storageId
    |> fromOption "Not Found"
    >>>= deleteDesign dataCtx

let private deleteStoredResourceFromDb (dataCtx: DataContext) (storageId: string) _ =
    findStoredResource dataCtx storageId
    |> fromOption "NotFound"
    >>>= deleteStoredResource dataCtx

let deleteFromDb (dataCtx: DataContext) (userId: int) (designName: string) (storageId: string) =
    findUsersSavedDesignWithName dataCtx userId designName
    |> fromOption "Not found"
    >>>= deleteSavedDesign dataCtx
    >>= deleteDesignFromDb dataCtx storageId
    >>= deleteStoredResourceFromDb dataCtx storageId
    >>>= bindUnit storageId

let deleteDesign (ctx: AuthorizedContext) (request: DeleteDesignRequest) =
    savedDesignSource ctx.DataContext ctx.User.Id request.Name
    |> fromOption "Not found"
    >>= deleteFromDb ctx.DataContext ctx.User.Id request.Name
    >>= Storage.deleteDesign ctx.StoragePath
    |> toResponse (fun _ -> noContent) (fun _ -> notFound)

let getUserInfo (ctx: AuthorizedContext) =
    success {| Username = ctx.User.Username |}

let uploadImage (ctx: UnauthorizedContext) (next: HttpFunc) (httpContext: HttpContext) =
    task {
        let image = httpContext.Request.Form.Files.GetFile("image")

        let! result =
            image.OpenReadStream()
            |> Storage.saveImage ctx.StoragePath image.FileName

        return
            result
            |> toResponse createdWithData (fun err -> error err)
    }

let downloadImage (ctx: UnauthorizedContext) (next: HttpFunc) (httpContext: HttpContext) =
    task {
        let! image = Storage.loadImage ctx.StoragePath (string httpContext.Request.Query["storageId"])

        return
            match image with
            | Error _ -> notFound
            | Ok content -> streamData true (new System.IO.MemoryStream(content)) None None
    }

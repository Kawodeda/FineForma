module FineForma.Data

open System.Linq
open FineFormaCore
open DbRecords
open DataContext

let createUser (dataCtx: DataContext) (user: User) =
    dataCtx.User.Add user
    |> ignore

    dataCtx.SaveChanges()
    |> ignore

let userExists (dataCtx: DataContext) (username: string) =
    query {
        for user in dataCtx.User do
            exists (user.Username = username)
    }

let userIdExists (dataCtx: DataContext) (userId: int) =
    query {
        for user in dataCtx.User do
            exists (user.Id = userId)
    }

let findUser (dataCtx: DataContext) (username: string) =
    if userExists dataCtx username then
        Some(
            query {
                for user in dataCtx.User do
                    find (user.Username = username)
            }
        )
    else
        None

let listUserDesigns (dataCtx: DataContext) (userId: int) =
    if userIdExists dataCtx userId then
        Ok(
            query {
                for savedDesign in dataCtx.SavedDesign do
                    join design in dataCtx.Design on (savedDesign.Design = design.Id)
                    where (savedDesign.User = userId)
                    select design
            }
        )
    else
        Error $"User with id={userId} does not exist"

let userHasSavedDesign (dataCtx: DataContext) (userId: int) (storageId: string) =
    query {
        for savedDesign in dataCtx.SavedDesign do
            join design in dataCtx.Design on (savedDesign.Design = design.Id)
            join resource in dataCtx.StoredResource on (design.Source = resource.Id)
            where (savedDesign.User = userId)
            exists (resource.StorageId = storageId)
    }

let findUsersSavedDesignWithName (dataCtx: DataContext) (userId: int) (designName: string) =
    query {
        for savedDesign in dataCtx.SavedDesign do
            join design in dataCtx.Design on (savedDesign.Design = design.Id)
            join resource in dataCtx.StoredResource on (design.Source = resource.Id)

            where (
                savedDesign.User = userId
                && resource.Name = designName
            )

            select savedDesign
            exactlyOneOrDefault
    }
    |> Maybe.ofObj

let storedResourceExists (dataCtx: DataContext) (storageId: string) =
    query {
        for resource in dataCtx.StoredResource do
            exists (resource.StorageId = storageId)
    }

let getStoredResource (dataCtx: DataContext) (design: Design) =
    query {
        for resource in dataCtx.StoredResource do
            find (resource.Id = design.Source)
    }

let findStoredResource (dataCtx: DataContext) (storageId: string) =
    if storedResourceExists dataCtx storageId then
        Some(
            query {
                for resource in dataCtx.StoredResource do
                    find (resource.StorageId = storageId)
            }
        )
    else
        None

let saveStoredResource (dataCtx: DataContext) (resource: StoredResource) =
    match findStoredResource dataCtx resource.StorageId with
    | Some resource -> resource.Id
    | None ->
        let storedResource = dataCtx.StoredResource.Add(resource)

        dataCtx.SaveChanges()
        |> ignore

        storedResource.Entity.Id

let deleteStoredResource (dataCtx: DataContext) (storedResource: StoredResource) =
    storedResource
    |> dataCtx.StoredResource.Remove
    |> ignore

    dataCtx.SaveChanges()
    |> ignore

let findDesignWithStorageId (dataCtx: DataContext) (storageId: string) =
    query {
        for design in dataCtx.Design do
            join resource in dataCtx.StoredResource on (design.Source = resource.Id)
            where (resource.StorageId = storageId)
            select design
            headOrDefault
    }
    |> Maybe.ofObj

let saveDesign (dataCtx: DataContext) (design: Design) =
    if dataCtx.Design.Contains design then
        design.Id
    else
        let design = dataCtx.Design.Add design

        dataCtx.SaveChanges()
        |> ignore

        design.Entity.Id

let deleteDesign (dataCtx: DataContext) (design: Design) =
    design
    |> dataCtx.Design.Remove
    |> ignore

    dataCtx.SaveChanges()
    |> ignore

let getSavedDesignSource (dataCtx: DataContext) (savedDesignId: int) =
    let source =
        query {
            for savedDesign in dataCtx.SavedDesign do
                join design in dataCtx.Design on (savedDesign.Design = design.Id)
                join storedResource in dataCtx.StoredResource on (design.Source = storedResource.Id)
                where (savedDesign.Id = savedDesignId)
                select storedResource.StorageId
                exactlyOneOrDefault
        }

    source
    |> Option.ofObj

let createSavedDesign (dataCtx: DataContext) (savedDesign: SavedDesign) =
    let savedDesign = dataCtx.SavedDesign.Add savedDesign

    dataCtx.SaveChanges()
    |> ignore

    savedDesign.Entity.Id

let deleteSavedDesign (dataCtx: DataContext) (savedDesign: SavedDesign) =
    savedDesign
    |> dataCtx.SavedDesign.Remove
    |> ignore

    dataCtx.SaveChanges()
    |> ignore

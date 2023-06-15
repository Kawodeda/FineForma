module FineForma.DataContext

open Microsoft.EntityFrameworkCore
open FineForma.DbRecords

type DataContext(options) =
    inherit DbContext(options)

    [<DefaultValue>]
    val mutable private user: DbSet<User>

    [<DefaultValue>]
    val mutable private storedResource: DbSet<StoredResource>

    [<DefaultValue>]
    val mutable private design: DbSet<Design>

    [<DefaultValue>]
    val mutable private savedDesgin: DbSet<SavedDesign>

    [<DefaultValue>]
    val mutable private assetType: DbSet<AssetType>

    [<DefaultValue>]
    val mutable private asset: DbSet<Asset>

    [<DefaultValue>]
    val mutable private savedAsset: DbSet<SavedAsset>

    member this.User
        with public get () = this.user
        and public set value = this.user <- value

    member this.StoredResource
        with public get () = this.storedResource
        and public set value = this.storedResource <- value

    member this.Design
        with public get () = this.design
        and public set value = this.design <- value

    member this.SavedDesign
        with public get () = this.savedDesgin
        and public set value = this.savedDesgin <- value

    member this.AssetType
        with public get () = this.assetType
        and public set value = this.assetType <- value

    member this.Asset
        with public get () = this.asset
        and public set value = this.asset <- value

    member this.SavedAsset
        with public get () = this.savedAsset
        and public set value = this.savedAsset <- value

    override this.OnModelCreating(builder) =
        builder
            .Entity<SavedAsset>()
            .HasKey(fun savedAsset -> (savedAsset.User, savedAsset.Asset) :> obj)
        |> ignore

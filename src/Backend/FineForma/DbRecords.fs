module FineForma.DbRecords

open System

[<CLIMutable>]
type User = {
    [<DefaultValue>]
    Id: int
    Username: string
    Password: byte array
    Salt: byte array
    RegistrationDate: DateOnly
}

[<CLIMutable>]
type StoredResource = {
    [<DefaultValue>]
    Id: int
    StorageId: string
    Name: string
    Thumbnail: byte array
}

[<CLIMutable>]
type Design = {
    [<DefaultValue>]
    Id: int
    Source: int
    LastEdited: DateTime
}

[<CLIMutable>]
type SavedDesign = {
    [<DefaultValue>]
    Id: int
    User: int
    Design: int
}

[<CLIMutable>]
type AssetType = {
    [<DefaultValue>]
    Id: int
    Title: string
}

[<CLIMutable>]
type Asset = {
    [<DefaultValue>]
    Id: int
    Source: int
    Type: int
}

[<CLIMutable>]
type SavedAsset = {
    User: int
    Asset: int
}

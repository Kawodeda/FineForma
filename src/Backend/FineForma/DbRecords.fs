module FineForma.DbRecords

open System

[<CLIMutable>]
type User = {
    Id: int
    Username: string
    Password: byte array
    RegistrationDate: DateOnly
}

[<CLIMutable>]
type StoredResource = {
    Id: int
    StorageId: string
    Name: string
    Thumbnail: byte array
}

[<CLIMutable>]
type Design = {
    Id: int
    Source: int
    LastEdited: DateTime
}

[<CLIMutable>]
type SavedDesign = {
    Id: int
    User: int
    Design: int
}

[<CLIMutable>]
type AssetType = {
    Id: int
    Title: string
}

[<CLIMutable>]
type Asset = {
    Id: int
    Source: int
    Type: int
}

[<CLIMutable>]
type SavedAsset = {
    User: int
    Asset: int
}

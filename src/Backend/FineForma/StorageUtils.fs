module FineForma.StorageUtils

open System
open System.Security.Cryptography
open System.Text

type StorageResult<'a, 'err> =
    | Ok of 'a
    | NotFound
    | Error of 'err

type StorageResultBuilder() =

    member this.Bind m f =
        match m with
        | Ok a -> f a
        | NotFound -> NotFound
        | Error err -> Error err

    member this.Return x = x


let storageResult = new StorageResultBuilder()

let (>>=) m f =
    match m with
    | Ok a -> f a
    | NotFound -> NotFound
    | Error err -> Error err

let (|>>) m f =
    match m with
    | Ok a -> Ok(f a)
    | NotFound -> NotFound
    | Error err -> Error err

type Id = string

let md5 (data: byte array) : string =
    use md5 = MD5.Create()

    (StringBuilder(), md5.ComputeHash(data))
    ||> Array.fold (fun hash byte -> hash.Append(byte.ToString("x2")))
    |> string

let storageId (str: string) =
    str
    |> Encoding.ASCII.GetBytes
    |> md5
    |> Id

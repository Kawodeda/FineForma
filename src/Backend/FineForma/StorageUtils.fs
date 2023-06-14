module FineForma.StorageUtils

open System
open System.Security.Cryptography
open System.Text

type StorageResult<'a, 'err> =
    | Ok of 'a
    | NotFound
    | Error of 'err

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

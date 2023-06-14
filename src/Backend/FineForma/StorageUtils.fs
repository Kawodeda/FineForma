module FineForma.StorageUtils

open System
open System.Security.Cryptography
open System.Text

let md5 (data: byte array) : string =
    use md5 = MD5.Create()

    (StringBuilder(), md5.ComputeHash(data))
    ||> Array.fold (fun hash byte -> hash.Append(byte.ToString("x2")))
    |> string

let storageId (object: obj) =
    object.GetHashCode()
    |> BitConverter.GetBytes
    |> md5

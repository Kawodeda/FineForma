module FineForma.Security

open System.Security.Cryptography
open System.Text

let private keySize = 64

let private iterations = 350000

let private hashPasswordWithSalt (password: string) (salt: byte array) =
    Rfc2898DeriveBytes.Pbkdf2(Encoding.UTF8.GetBytes password, salt, iterations, HashAlgorithmName.SHA512, keySize)

let private compareHashes a b =
    Array.compareWith
        (fun a b ->
            (a - b)
            |> int)
        a
        b = 0

let hashPassword (password: string) =
    let salt = RandomNumberGenerator.GetBytes keySize

    (hashPasswordWithSalt password salt, salt)

let validatePassword (password: string) (salt: byte array) (passwordHash: byte array) =
    hashPasswordWithSalt password salt
    |> compareHashes passwordHash

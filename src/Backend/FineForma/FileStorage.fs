module FineForma.FileStorage

open System.IO
open FineForma.StorageUtils

let writeText (path: string) (content: string) =
    async {
        try
            use writer = File.CreateText path

            do!
                content
                |> writer.WriteAsync
                |> Async.AwaitTask

            return Ok()
        with exn ->
            return Error exn
    }

let readText (path: string) =
    async {
        try
            if
                (File.Exists
                 >> not)
                    path
            then
                return NotFound
            else
                let! content =
                    File.ReadAllTextAsync path
                    |> Async.AwaitTask

                return Ok content
        with exn ->
            return Error exn
    }

let deleteFile (path: string) =
    try
        match File.Exists path with
        | true ->
            File.Delete path
            |> Ok
        | false -> NotFound
    with exn ->
        Error exn

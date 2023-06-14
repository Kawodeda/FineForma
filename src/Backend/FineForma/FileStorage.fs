module FineForma.FileStorage

open System.IO

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
            let! content =
                File.ReadAllTextAsync path
                |> Async.AwaitTask

            return Ok content
        with exn ->
            return Error exn
    }

let deleteFile (path: string) =
    try
        File.Delete path
        |> Ok
    with exn ->
        Error exn

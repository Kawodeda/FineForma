module FineForma.FileStorage

open System.IO
open System.Threading.Tasks

let writeText (path: string) (content: string) =
    async {
        try
            use writer = File.CreateText path

            do!
                content
                |> writer.WriteAsync
                |> Async.AwaitTask

            return Result.Ok()
        with exn ->
            return Result.Error exn
    }

let readText (path: string) =
    async {
        try
            if
                (File.Exists
                 >> not)
                    path
            then
                return Result.Error "Not found"
            else
                let! content =
                    File.ReadAllTextAsync path
                    |> Async.AwaitTask

                return Result.Ok content
        with exn ->
            return Result.Error exn.Message
    }

let deleteFile (path: string) =
    try
        match File.Exists path with
        | true ->
            File.Delete path
            |> Result.Ok
        | false -> Result.Error "Not found"
    with exn ->
        Result.Error exn.Message

let createDirectory (path: string) =
    try
        Result.Ok(
            Directory.CreateDirectory path
            |> ignore
        )
    with exn ->
        Result.Error exn

let write (path: string) (content: Stream) =
    async {
        use file = File.OpenWrite path

        do!
            file
            |> content.CopyToAsync
            |> Async.AwaitTask

        return Ok()
    }

let read (path: string) =
    async {
        if not (File.Exists path) then
            return Error "Not found"
        else
            let! content =
                File.ReadAllBytesAsync path
                |> Async.AwaitTask

            return Ok content
    }

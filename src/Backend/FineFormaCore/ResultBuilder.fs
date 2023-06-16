module FineFormaCore.ResultBuilder

type ResultBuilder() =

    member this.Bind(x, f) =
        match x with
        | Ok a -> f a
        | Error err -> Error err

    member this.Return(x) = Ok x

let (>>=) m f =
    match m with
    | Ok a -> f a
    | Error err -> Error err

let (>>>=) m f =
    match m with
    | Ok a -> Ok(f a)
    | Error err -> Error err

let result = new ResultBuilder()

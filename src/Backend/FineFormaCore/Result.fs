module FineFormaCore.Result

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

let fromOption noneErr option =
    match option with
    | Some a -> Ok a
    | None -> Error noneErr

let result = new ResultBuilder()

module FineFormaCore.ResultBuilder

type ResultBuilder() =

    member this.Bind(x, f) =
        match x with
        | Ok a -> f a
        | Error e -> Error e

    member this.Return(x) = Ok x

    member this.Zero() = None

let result = new ResultBuilder()

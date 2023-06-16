module FineFormaCore.Maybe

type MaybeBuilder() =

    member this.Bind(x, f) =
        match x with
        | None -> None
        | Some a -> f a

    member this.Return(x) = Some x

let ofObj obj =
    if obj :> obj = null then None else Some obj

let (|>>) m f =
    match m with
    | Some a -> Some(f a)
    | None -> None

let maybe = new MaybeBuilder()

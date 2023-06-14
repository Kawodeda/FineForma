module FineForma.Json

open Microsoft.FSharpLu.Json

let serialize obj = Compact.serialize obj

let deserialize<'a> str =
    try
        Compact.deserialize<'a> str
        |> Ok
    with ex ->
        Error ex

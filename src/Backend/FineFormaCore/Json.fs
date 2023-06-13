module FineFormaCore.Json

open Newtonsoft.Json

let serialize obj = JsonConvert.SerializeObject obj

let deserialize<'a> str =
    try
        JsonConvert.DeserializeObject<'a> str |> Ok
    with ex ->
        Error ex

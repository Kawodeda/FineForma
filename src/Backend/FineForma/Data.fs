module FineForma.Data

open DbRecords
open DataContext

let createUser (dataCtx: DataContext) (user: User) =
    dataCtx.User.Add user
    |> ignore

    dataCtx.SaveChanges()
    |> ignore

let userExists (dataCtx: DataContext) (username: string) =
    query {
        for user in dataCtx.User do
            exists (user.Username = username)
    }

let findUser (dataCtx: DataContext) (username: string) =
    if userExists dataCtx username then
        Some(
            query {
                for user in dataCtx.User do
                    find (user.Username = username)
            }
        )
    else
        None

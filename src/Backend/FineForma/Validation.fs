module FineForma.Validation

open System
open FineFormaCore.Result
open FineForma.Requests

let stringIsNotEmpty paramName str =
    if String.IsNullOrWhiteSpace str then
        Error $"{paramName} was empty"
    else
        Ok str

let stringIsShorterThan length paramName str =
    if String.length str > length then
        Error $"{paramName} length was greater than {length}"
    else
        Ok str

let validateUsername (username: string) =
    username
    |> stringIsNotEmpty "Username"
    >>= stringIsShorterThan 100 "Username"

let validateSignUp (request: SignUpRequest) : Result<SignUpRequest, string> =
    result {
        let! username = validateUsername request.Username
        let! password = stringIsNotEmpty "Password" request.Password

        return {
            Username = username
            Password = password
        }
    }

let validateLogIn (request: LogInRequest) =
    result {
        let! username = validateUsername request.Username
        let! password = stringIsNotEmpty "Password" request.Password

        return {
            Username = username
            Password = password
        }
    }

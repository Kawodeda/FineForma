module FineForma.App

open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Giraffe
open FineFormaCore.Design

// ---------------------------------
// Web app
// ---------------------------------

let indexHandler = json "fine forma api"

let square (a: int) =
    match a with
    | 1 -> "Error: 1 is not supported" |> Error
    | _ -> a * a |> Ok

let design = {
    Layers = [
        {
            Items = [
                ClosedShape {
                    Position = zeroVector2
                    Transform = {
                        Translate = zeroVector2
                        Scale = vector2 (1, 1)
                        Rotate = 0
                    }
                    Controls =
                        Rectangle {
                            Corner1 = vector2 (-100, -100)
                            Corner2 = vector2 (100, 100)
                        }
                    Style = {|
                        Fill = Solid { Color = rgb 255uy 0uy 0uy }
                        Stroke = {
                            Style = Solid { Color = rgb 0uy 0uy 0uy }
                            Width = 2
                            Dash = {
                                Dashes = []
                                DashOffset = 0
                            }
                        }
                    |}
                }
            ]
            ZIndex = 0
        }
    ]
}

let designHandler = json design

let webApp =
    choose [
        GET >=> choose [ route "/" >=> indexHandler; route "/design" >=> designHandler ]
        setStatusCode 404 >=> text "bibok"
    ]

// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex: Exception) (logger: ILogger) =
    logger.LogError(ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

// ---------------------------------
// Config and Main
// ---------------------------------

let configureCors (builder: CorsPolicyBuilder) =
    builder
        .WithOrigins("http://localhost:5000", "https://localhost:5001")
        .AllowAnyMethod()
        .AllowAnyHeader()
    |> ignore

let configureApp (app: IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IWebHostEnvironment>()

    (match env.IsDevelopment() with
     | true -> app.UseDeveloperExceptionPage()
     | false -> app.UseGiraffeErrorHandler(errorHandler).UseHttpsRedirection())
        .UseCors(configureCors)
        .UseStaticFiles()
        .UseGiraffe(webApp)

let configureServices (services: IServiceCollection) =
    services.AddCors() |> ignore
    services.AddGiraffe() |> ignore

let configureLogging (builder: ILoggingBuilder) =
    builder.AddConsole().AddDebug() |> ignore

[<EntryPoint>]
let main args =
    Host
        .CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(fun webHostBuilder ->
            webHostBuilder
                .Configure(Action<IApplicationBuilder> configureApp)
                .ConfigureServices(configureServices)
                .ConfigureLogging(configureLogging)
            |> ignore)
        .Build()
        .Run()

    0

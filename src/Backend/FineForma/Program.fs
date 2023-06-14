module FineForma.App

open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.FSharpLu.Json
open Newtonsoft.Json
open Giraffe
open FineForma
open FineFormaCore.Domain.Math
open FineFormaCore.Domain.Style
open FineFormaCore.Domain.Design
open Microsoft.AspNetCore.Http

// ---------------------------------
// Configuration
// ---------------------------------

let designFileStoragePath =
    @"c:\Users\konse\source\repos\FineForma\src\Backend\Storage\Design"

// ---------------------------------
// Web app
// ---------------------------------

let indexHandler = json "fine forma api"

let design = {
    Layers = [
        {
            Items = [
                ClosedShape {
                    Position = Vector2.zero
                    Transform = {
                        Translate = Vector2.zero
                        Scale = Vector2.create 1 1
                        Rotate = 0
                    }
                    Controls =
                        Rectangle {
                            Corner1 = Vector2.create -100 -100
                            Corner2 = Vector2.create 100 100
                        }
                    Style = {|
                        Fill = Solid { Color = Color.rgb 255uy 0uy 0uy }
                        Stroke = {
                            Style = Solid { Color = Color.rgb 0uy 0uy 0uy }
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

let getDefaultDesignHandler =
    setContentType "application/json"
    >=> (design
         |> Json.serialize
         |> setBodyFromString)

let webApp =
    choose [
        GET
        >=> choose [
            route "/"
            >=> indexHandler
            routef "/designs/%s" (Handlers.loadDesign designFileStoragePath)
            route "/designs/"
            >=> getDefaultDesignHandler
        ]

        POST
        >=> choose [ routef "/designs/save/%s" (Handlers.saveDesign designFileStoragePath) ]

        DELETE
        >=> choose [ routef "/designs/delete/%s" (Handlers.deleteDesign designFileStoragePath) ]

        setStatusCode 404
        >=> text "bibok"
    ]

// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex: Exception) (logger: ILogger) =
    logger.LogError(ex, "An unhandled exception has occurred while executing the request.")

    clearResponse
    >=> setStatusCode 500
    >=> text (
        ex.Message
        + ex.ToString()
    )

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
    services.AddCors()
    |> ignore

    services.AddGiraffe()
    |> ignore

    let jsonSettings = JsonSerializerSettings()
    jsonSettings.Converters.Add(CompactUnionJsonConverter(true))

    services.AddSingleton<Json.ISerializer>(NewtonsoftJson.Serializer(jsonSettings))
    |> ignore

let configureLogging (builder: ILoggingBuilder) =
    builder.AddConsole().AddDebug()
    |> ignore

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

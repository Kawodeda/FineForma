module FineForma.App

open System
open System.Text
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Authentication.JwtBearer
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.CookiePolicy
open Microsoft.IdentityModel.Tokens
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.EntityFrameworkCore
open Microsoft.FSharpLu.Json
open Giraffe
open Newtonsoft.Json
open FineForma
open FineForma.Middlewares
open FineForma.HttpUtils
open FineForma.Requests
open FineForma.Handlers
open FineForma.DataContext
open FineForma.Configuration

// ---------------------------------
// Web app
// ---------------------------------

let indexHandler = json "fine forma api"

let webApp =
    choose [
        GET
        >=> choose [
            route "/"
            >=> indexHandler

            route "/designs/list"
            >=> bindAuthorizedSync listDesigns

            route "/designs"
            >=> bindAuthorized parseLoadDesignRequest loadDesign
        ]

        POST
        >=> choose [
            route "/signup"
            >=> bindBody Authentication.signUp

            route "/login"
            >=> bindBodyWithCookies Authentication.logIn

            route "/logout"
            >=> Authentication.logOut

            route "/designs/save"
            >=> bindAuthorizedAsyncRequest parseSaveDesignRequest saveDesign
        ]

        DELETE
        >=> choose [
            route "/designs/delete"
            >=> bindAuthorizedSyncRequest parseDeleteDesignRequest deleteDesign
        ]

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
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader()
    |> ignore

let cookiePolicyOptions =
    let options = CookiePolicyOptions()
    options.MinimumSameSitePolicy <- SameSiteMode.Strict
    options.HttpOnly <- HttpOnlyPolicy.Always
    options.Secure <- CookieSecurePolicy.Always

    options

let configureApp (app: IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IWebHostEnvironment>()

    (match env.IsDevelopment() with
     | true -> app.UseDeveloperExceptionPage()
     | false -> app.UseGiraffeErrorHandler(errorHandler).UseHttpsRedirection())
        .UseCors(configureCors)
        .UseCookiePolicy(cookiePolicyOptions)
        .Use(authenticationCookieMiddleware)
        .UseStaticFiles()
        .UseAuthentication()
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

    services
        .AddAuthentication(fun opt -> opt.DefaultAuthenticateScheme <- JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(fun opt ->
            opt.TokenValidationParameters <-
                TokenValidationParameters(
                    IssuerSigningKey = SymmetricSecurityKey(Encoding.UTF8.GetBytes(Authentication.secret)),
                    ValidateAudience = false,
                    ValidateIssuer = true,
                    ValidIssuer = "fine-forma"
                ))
    |> ignore

    services.AddDbContext<DataContext>(fun optionsBuilder ->
        optionsBuilder.UseNpgsql(Settings.ConnectionStrings.FineFormaDb)
        |> ignore)
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

# dotnetcorereactts
## A .Net Core + React + Redux + HMR base

## Guide

* Create project according to https://github.com/aspnet/JavaScriptServices
e.g. Use the aspnetcore-spa (generator-aspnetcore-spa) with react+redux settings

* Add SignalR (see https://chsakell.com/2016/10/10/real-time-applications-using-asp-net-core-signalr-angular/)
e.g. Add dependencies, NuGet config (sources), startup, typings, etc.

NB: Use SignalR 2.2.* @types with 0.2.0 signalR for .net core, not older 0.2.0 typings

* Added dotnet watch:-
e.g.     "Microsoft.DotNet.Watcher.Tools": "1.1.0-preview4-final",   (In devDependencies)
... then use "dotnet watch run" to live rebuild :)

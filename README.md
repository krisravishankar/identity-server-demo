# identity-server-demo
IdentityServer4 authentication using ASP.NET Identity for User Management

## Prerequisites
* .NET Core 3.1 SDK and runtime
* Node
* Yarn
* Visual Studio
* Visual Studio Code
* SQL Server

## Getting started
* Clone the repo
* Open the IdentityServer.Core project in the identity-server-core folder in Visual Studio
* Run the IdentityServer.Core project on https://localhost:5001
* Go to the Register page and register a user
* Open the IdentityServer.Demo.Api project in the identity-server-demo-api folder in Visual Studio
* Run the IdentityServer.Demo.Api project on https://localhost:5005
* Open the identity-server-demo-wep project in Visual Studio Code
* `yarn install` to get all necessary packages
* `yarn start` to run the app on http://localhost:3006

## What it does
Go to the React web app. You will see a Login button. When you click the Login button, you will be taken to a Login page that's hosted on the IdentityServer.Core app. Go ahead and login with the credentials you used when you registered. If your credentials are correct, you will be logged in, then redirected back to your React app where you will be taken to the Secure page and you can see your user's information including ID token and access token. You can also click the Call API button to make a request to the endpoint in the IdentityServer.Demo.Api application. The request will be made with the access token passed in as an Authorization header. 

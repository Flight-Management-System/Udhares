# Start the Vue.js application in the 'udhares' directory
Start-Process npm -ArgumentList "run serve" -NoNewWindow -WorkingDirectory ".\udhares\" -PassThru

# Start the ASP.NET project in the 'API' directory
Start-Process dotnet -ArgumentList "run" -NoNewWindow -WorkingDirectory ".\API\" -PassThru
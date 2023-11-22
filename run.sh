#!/bin/bash

# Start the Vue.js application in the 'udhares' directory
cd /udhares
npm run serve &

# Capture Vue.js process ID
vue_pid=$!

# Start the ASP.NET project in the 'API' directory
cd /API
dotnet run &

# Capture ASP.NET process ID
dotnet_pid=$!

# Wait for both processes to finish
wait $vue_pid
wait $dotnet_pid
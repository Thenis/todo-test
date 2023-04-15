#!/bin/bash

APP_NAME="notebase"
RESOURCE_GROUP="notebase"

# Fetch the environment variables from Azure and store them in a JSON file
az webapp config appsettings list --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --output json > env_variables.json

# Replace with the names of the environment variables you want to pass to the build process
SELECTED_VARIABLES=("REACT_APP_FIREBASE_API_KEY" "REACT_APP_FIREBASE_APP_ID" "REACT_APP_FIREBASE_AUTH_DOMAIN" "REACT_APP_FIREBASE_MESSAGING_SENDER_ID" "REACT_APP_FIREBASE_PROJECT_ID" "REACT_APP_FIREBASE_STORAGE_BUCKET" "SUMMARY_API_KEY" "APPINSIGHTS_INSTRUMENTATIONKEY" "APPLICATIONINSIGHTS_CONNECTION_STRING")

# Prepare the build arguments string
BUILD_ARGS=""

for var_name in "${SELECTED_VARIABLES[@]}"; do
  var_value=$(jq -r ".[] | select(.name == \"$var_name\") | .value" env_variables.json)
  BUILD_ARGS+=" --build-arg $var_name=$var_value"
done

# use the last commit hash as a unique tag
# UNIQUE_TAG=$(git rev-parse --short HEAD)

# Build the Docker image and pass the environment variables as build arguments
docker build --platform linux/amd64 $BUILD_ARGS -t notebase:latest .

# Remove the temporary JSON file
rm env_variables.json

echo "Built Docker image with environment variables from Azure Web App."

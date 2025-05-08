#!/bin/bash

# Set the DATABASE_URL environment variable if it's not already set
if [ -z "$DATABASE_URL" ]; then
  echo "Warning: DATABASE_URL is not set. Using default connection string."
  export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
fi

# Display environment variables (without showing sensitive values)
echo "Starting NestJS application with the following environment:"
echo "NODE_ENV: ${NODE_ENV:-development}"
echo "DATABASE_URL: [HIDDEN]"

# Run the NestJS application in development mode
echo "Starting NestJS application..."
npx nest start
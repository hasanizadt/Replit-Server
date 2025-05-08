#!/bin/bash

echo "Setting up database with the direct method (bypassing Prisma)..."

# Run the database setup script
npx ts-node prisma/seed-db.ts

echo "Database setup complete!"
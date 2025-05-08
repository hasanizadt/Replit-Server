#!/bin/bash

# Set OpenSSL library path
export LD_LIBRARY_PATH=/nix/store/yxvs0mvhib1rlx8qm41zn9ly5l3i2hw8-openssl-1.1.1v/lib:$LD_LIBRARY_PATH

# Regenerate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Run the minimal test app
echo "Starting minimal app..."
npx ts-node src/minimal-main.ts
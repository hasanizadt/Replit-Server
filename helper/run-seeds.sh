#!/bin/bash

: <<'COMMENT'
chmod +x run-seeds.sh  
./run-seeds.sh         
COMMENT

echo "Starting database seeding..."

echo "Running attributes seeds..."
npx ts-node prisma/seed/attributes
if [ $? -ne 0 ]; then
    echo "Error: Failed to run attributes seeding" >&2
    exit 1
fi

echo "Running brands seeds..."
npx ts-node prisma/seed/brands
if [ $? -ne 0 ]; then
    echo "Error: Failed to run brands seeding" >&2
    exit 1
fi

echo "Running categories seeds..."
npx ts-node prisma/seed/categories
if [ $? -ne 0 ]; then
    echo "Error: Failed to run categories seeding" >&2
    exit 1
fi

echo "Running products seeds..."
npx ts-node prisma/seed/products
if [ $? -ne 0 ]; then
    echo "Error: Failed to run products seeding" >&2
    exit 1
fi

echo "Running sellers seeds..."
npx ts-node prisma/seed/sellers
if [ $? -ne 0 ]; then
    echo "Error: Failed to run sellers seeding" >&2
    exit 1
fi

echo "Running users seeds..."
npx ts-node prisma/seed/users
if [ $? -ne 0 ]; then
    echo "Error: Failed to run users seeding" >&2
    exit 1
fi

echo "Database seeding completed successfully!"
exit 0
#!/bin/bash
# Set library path to include the directory with libssl.so.1.1
export LD_LIBRARY_PATH=/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH
# Run the application
npm run start:dev
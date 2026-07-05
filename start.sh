#!/bin/sh
set -e

echo "Starting socket server..."
node server.js &

sleep 2
echo "Starting Next.js app..."
exec npm run start

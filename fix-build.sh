#!/bin/bash

# Fix npm cache permissions
echo "Fixing npm cache permissions..."
sudo chown -R 501:20 "/Users/pictus/.npm"

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
sudo rm -rf node_modules package-lock.json

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Done! Try running 'npm run build' now."

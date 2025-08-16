#!/bin/bash
echo "Installing specific dependencies for Vercel deployment..."
npm install next@14.2.4 --save-exact --legacy-peer-deps
echo "Dependencies installed successfully."

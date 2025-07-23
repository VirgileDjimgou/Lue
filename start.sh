#!/bin/bash

echo "🚀 Starting YOLOv8 Vue.js application..."

# Check dependencies
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check model
echo "🧠 Checking model..."
if [ ! -d "public/models/yolov8n_web_model" ]; then
    echo "⚠️  WARNING: YOLOv8 model missing!"
    echo "📁 Please place the 'yolov8n_web_model' folder in 'public/models/'"
    echo "📚 Check public/models/README.md for more information"
    echo ""
fi

# Type checking
echo "🔍 Checking TypeScript types..."
npx vue-tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ Types OK, starting server..."
    npm run dev
else
    echo "❌ TypeScript errors detected"
    echo "🔧 Attempting to start despite errors..."
    npm run dev
fi

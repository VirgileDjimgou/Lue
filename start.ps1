Write-Host "🚀 Starting YOLOv8 Vue.js application..." -ForegroundColor Green

# Check dependencies
Write-Host "📦 Checking dependencies..." -ForegroundColor Blue
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check model
Write-Host "🧠 Checking model..." -ForegroundColor Blue
if (-not (Test-Path "public/models/yolov8n_web_model")) {
    Write-Host "⚠️  WARNING: YOLOv8 model missing!" -ForegroundColor Red
    Write-Host "📁 Please place the 'yolov8n_web_model' folder in 'public/models/'" -ForegroundColor Yellow
    Write-Host "📚 Check public/models/README.md for more information" -ForegroundColor Yellow
    Write-Host ""
}

# Start server
Write-Host "🌐 Starting development server..." -ForegroundColor Green
npm run dev

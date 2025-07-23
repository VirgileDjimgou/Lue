Write-Host "🚀 Démarrage de l'application YOLOv8 Vue.js..." -ForegroundColor Green

# Vérification des dépendances
Write-Host "📦 Vérification des dépendances..." -ForegroundColor Blue
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Vérification du modèle
Write-Host "🧠 Vérification du modèle..." -ForegroundColor Blue
if (-not (Test-Path "public/models/yolov8n_web_model")) {
    Write-Host "⚠️  ATTENTION: Modèle YOLOv8 manquant!" -ForegroundColor Red
    Write-Host "📁 Veuillez placer le dossier 'yolov8n_web_model' dans 'public/models/'" -ForegroundColor Yellow
    Write-Host "📚 Consultez public/models/README.md pour plus d'informations" -ForegroundColor Yellow
    Write-Host ""
}

# Démarrage
Write-Host "🌐 Démarrage du serveur de développement..." -ForegroundColor Green
npm run dev

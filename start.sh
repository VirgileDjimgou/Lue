#!/bin/bash

echo "🚀 Démarrage de l'application YOLOv8 Vue.js..."

# Vérification des dépendances
echo "📦 Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances..."
    npm install
fi

# Vérification du modèle
echo "🧠 Vérification du modèle..."
if [ ! -d "public/models/yolov8n_web_model" ]; then
    echo "⚠️  ATTENTION: Modèle YOLOv8 manquant!"
    echo "📁 Veuillez placer le dossier 'yolov8n_web_model' dans 'public/models/'"
    echo "📚 Consultez public/models/README.md pour plus d'informations"
    echo ""
fi

# Type checking
echo "🔍 Vérification des types TypeScript..."
npx vue-tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ Types OK, démarrage du serveur..."
    npm run dev
else
    echo "❌ Erreurs TypeScript détectées"
    echo "🔧 Tentative de démarrage malgré les erreurs..."
    npm run dev
fi

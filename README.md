# 🚀 YOLOv8 Vue.js Detection App

Modern real-time object detection application built with **Vue 3**, **TypeScript**, **TensorFlow.js** and **BootstrapVueNext**.

![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- 🖼️ **Image detection** - Drag and drop your images
- 🎥 **Video detection** - Support all video formats
- 📷 **Real-time webcam** - Instant detection via camera
- 🎯 **80 object classes** - Complete COCO dataset
- 🚀 **Optimized performance** - WebGL backend
- 📱 **Responsive interface** - Modern and adaptive design
- 🔒 **Type Safety** - Complete TypeScript
- 🎨 **Modern UI** - BootstrapVueNext + animations

## 🛠️ Technologies

### Frontend
- **Vue 3** - Composition API
- **TypeScript** - Static typing
- **Vite** - Ultra-fast build tool
- **Vue Router** - SPA navigation

### UI/UX
- **BootstrapVueNext** - UI Components
- **Bootstrap 5** - CSS Framework
- **Font Awesome** - Vector icons
- **CSS3** - Animations and effects

### State and Services
- **Pinia** - Modern state management
- **Axios** - HTTP client
- **Services Pattern** - Modular architecture

### Machine Learning
- **TensorFlow.js** - ML runtime
- **YOLOv8** - Detection model
- **WebGL Backend** - GPU acceleration

## 🚀 Installation and Setup

### Prerequisites
- **Node.js** 20+ 
- **npm** or **yarn**
- Modern browser with WebGL support

### Installation

1. **Clone the project**
   ```bash
   git clone <your-repo>
   cd vue3-yolov8-tensorflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add YOLOv8 model**
   
   Download a pre-converted model or convert your own:
   
   ```python
   # Conversion from Python
   from ultralytics import YOLO
   model = YOLO("yolov8n.pt")
   model.export(format="tfjs")
   ```
   
   Then place the `yolov8n_web_model` folder in `public/models/`

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── NavBar.vue
│   ├── LoadingOverlay.vue
│   ├── MediaControls.vue
│   └── DetectionViewer.vue
├── views/              # Main views
│   ├── HomeView.vue
│   └── AboutView.vue
├── stores/             # Pinia stores
│   └── app.ts
├── services/           # Business services
│   ├── modelService.ts
│   └── webcamService.ts
├── types/              # TypeScript types
│   └── index.ts
├── constants/          # Constants
│   └── index.ts
├── router/             # Router configuration
│   └── index.ts
├── style.css          # Global styles
└── main.ts            # Entry point

public/
├── models/            # TensorFlow.js models
│   └── yolov8n_web_model/
└── ...
```

## 🎯 Architecture

### Pinia Store
```typescript
interface AppState {
  model: ModelState;      // ML model state
  stream: StreamState;    // Media stream state
  config: AppConfig;      // Configuration
  error: string | null;   // Error handling
}
```

### Services
- **ModelService** - TensorFlow.js model management
- **WebcamService** - Camera access and video streams

### TypeScript Types
Complete type safety with interfaces for:
- Model and application states
- Configuration and parameters
- Media elements and detections

## 🔧 Configuration

### Available models
- **yolov8n** - Nano (~6MB) - Fastest
- **yolov8s** - Small (~22MB)
- **yolov8m** - Medium (~52MB)
- **yolov8l** - Large (~87MB)
- **yolov8x** - Extra Large (~136MB)

### Detection parameters
```typescript
// src/constants/index.ts
export const DETECTION_CONFIG = {
  CONFIDENCE_THRESHOLD: 0.2,
  IOU_THRESHOLD: 0.45,
  MAX_BOXES: 500
};
```

## 📦 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Type checking
npm run type-check
```

## 🌐 Supported Browsers

- ✅ **Chrome 80+**
- ✅ **Firefox 78+**
- ✅ **Safari 14+**
- ✅ **Edge 80+**

## 🚨 Troubleshooting

### Model won't load
- Check that the model folder is in `public/models/`
- Check console for CORS errors
- Ensure the model structure is correct

### Webcam not working
- Grant camera permissions
- Use HTTPS in production
- Check that no other app is using the camera

### Slow performance
- Enable GPU acceleration in browser
- Close other tabs
- Use a smaller model (yolov8n)

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Ultralytics](https://github.com/ultralytics/ultralytics) for YOLOv8
- [TensorFlow.js](https://www.tensorflow.org/js) for ML runtime
- [Vue.js](https://vuejs.org) for the framework
- [BootstrapVueNext](https://github.com/bootstrap-vue-next/bootstrap-vue-next) for UI components

## ✨ Fonctionnalités

- 🖼️ **Détection sur images** - Glissez-déposez vos images
- 🎥 **Détection sur vidéos** - Supportez tous les formats vidéo
- 📷 **Webcam en temps réel** - Détection instantanée via la caméra
- 🎯 **80 classes d'objets** - Dataset COCO complet
- 🚀 **Performance optimisée** - Backend WebGL
- 📱 **Interface responsive** - Design moderne et adaptatif
- 🔒 **Type Safety** - TypeScript complet
- 🎨 **UI moderne** - BootstrapVueNext + animations

## 🛠️ Technologies

### Frontend
- **Vue 3** - Composition API
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Vue Router** - Navigation SPA

### UI/UX
- **BootstrapVueNext** - Composants UI
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Icônes vectorielles
- **CSS3** - Animations et effets

### État et Services
- **Pinia** - Gestion d'état moderne
- **Axios** - Client HTTP
- **Services Pattern** - Architecture modulaire

### Machine Learning
- **TensorFlow.js** - Runtime ML
- **YOLOv8** - Modèle de détection
- **WebGL Backend** - Accélération GPU

## 🚀 Installation et Démarrage

### Prérequis
- **Node.js** 20+ 
- **npm** ou **yarn**
- Navigateur moderne avec support WebGL

### Installation

1. **Cloner le projet**
   ```bash
   git clone <votre-repo>
   cd vue3-yolov8-tensorflow
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Ajouter le modèle YOLOv8**
   
   Téléchargez un modèle pré-converti ou convertissez le vôtre :
   
   ```python
   # Conversion depuis Python
   from ultralytics import YOLO
   model = YOLO("yolov8n.pt")
   model.export(format="tfjs")
   ```
   
   Puis placez le dossier `yolov8n_web_model` dans `public/models/`

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Ouvrir l'application**
   ```
   http://localhost:3000
   ```

## 📁 Structure du Projet

```
src/
├── components/          # Composants Vue
│   ├── NavBar.vue
│   ├── LoadingOverlay.vue
│   ├── MediaControls.vue
│   └── DetectionViewer.vue
├── views/              # Vues principales
│   ├── HomeView.vue
│   └── AboutView.vue
├── stores/             # Stores Pinia
│   └── app.ts
├── services/           # Services métier
│   ├── modelService.ts
│   └── webcamService.ts
├── types/              # Types TypeScript
│   └── index.ts
├── constants/          # Constantes
│   └── index.ts
├── router/             # Configuration router
│   └── index.ts
├── style.css          # Styles globaux
└── main.ts            # Point d'entrée

public/
├── models/            # Modèles TensorFlow.js
│   └── yolov8n_web_model/
└── ...
```

## 🎯 Architecture

### Store Pinia
```typescript
interface AppState {
  model: ModelState;      // État du modèle ML
  stream: StreamState;    // État des flux média
  config: AppConfig;      // Configuration
  error: string | null;   // Gestion d'erreurs
}
```

### Services
- **ModelService** - Gestion des modèles TensorFlow.js
- **WebcamService** - Accès caméra et flux vidéo

### Types TypeScript
Type safety complet avec interfaces pour :
- États du modèle et de l'application
- Configuration et paramètres
- Éléments média et détections

## 🔧 Configuration

### Modèles disponibles
- **yolov8n** - Nano (~6MB) - Le plus rapide
- **yolov8s** - Small (~22MB)
- **yolov8m** - Medium (~52MB)
- **yolov8l** - Large (~87MB)
- **yolov8x** - Extra Large (~136MB)

### Paramètres de détection
```typescript
// src/constants/index.ts
export const DETECTION_CONFIG = {
  CONFIDENCE_THRESHOLD: 0.2,
  IOU_THRESHOLD: 0.45,
  MAX_BOXES: 500
};
```

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualisation build
npm run preview

# Type checking
npm run type-check
```

## 🌐 Navigateurs Supportés

- ✅ **Chrome 80+**
- ✅ **Firefox 78+**
- ✅ **Safari 14+**
- ✅ **Edge 80+**

## 🚨 Résolution de Problèmes

### Modèle ne se charge pas
- Vérifiez que le dossier modèle est dans `public/models/`
- Vérifiez la console pour les erreurs CORS
- Assurez-vous que la structure du modèle est correcte

### Webcam ne fonctionne pas
- Accordez les permissions caméra
- Utilisez HTTPS en production
- Vérifiez qu'aucune autre app n'utilise la caméra

### Performance lente
- Activez l'accélération GPU dans le navigateur
- Fermez les autres onglets
- Utilisez un modèle plus petit (yolov8n)

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir `LICENSE` pour plus d'informations.

## 🙏 Remerciements

- [Ultralytics](https://github.com/ultralytics/ultralytics) pour YOLOv8
- [TensorFlow.js](https://www.tensorflow.org/js) pour le runtime ML
- [Vue.js](https://vuejs.org) pour le framework
- [BootstrapVueNext](https://github.com/bootstrap-vue-next/bootstrap-vue-next) pour les composants UI

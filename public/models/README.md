# Modèles YOLOv8

Placez vos modèles YOLOv8 convertis au format TensorFlow.js dans ce dossier.

## Structure attendue :
```
models/
├── yolov8n_web_model/
│   ├── model.json
│   ├── group1-shard1of4.bin
│   ├── group1-shard2of4.bin
│   ├── group1-shard3of4.bin
│   ├── group1-shard4of4.bin
│   └── metadata.yaml
```

## Comment obtenir un modèle :

1. **Télécharger un modèle pré-converti :**
   - Copiez le dossier `yolov8n_web_model` depuis le projet original
   - Placez-le dans ce dossier `public/models/`

2. **Convertir votre propre modèle :**
   ```python
   from ultralytics import YOLO
   
   # Charger un modèle
   model = YOLO("yolov8n.pt")
   
   # Exporter vers TensorFlow.js
   model.export(format="tfjs")
   ```

## Modèles disponibles :
- **yolov8n** : Nano (le plus rapide, ~6MB)
- **yolov8s** : Small (~22MB)  
- **yolov8m** : Medium (~52MB)
- **yolov8l** : Large (~87MB)
- **yolov8x** : Extra Large (~136MB)

Plus le modèle est grand, plus il est précis mais plus lent.

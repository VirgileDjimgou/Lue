# YOLOv8 Models

Place your YOLOv8 models converted to TensorFlow.js format in this folder.

## Expected structure:
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

## How to get a model:

1. **Download a pre-converted model:**
   - Copy the `yolov8n_web_model` folder from the original project
   - Place it in this `public/models/` folder

2. **Convert your own model:**
   ```python
   from ultralytics import YOLO
   
   # Load a model
   model = YOLO("yolov8n.pt")
   
   # Export to TensorFlow.js
   model.export(format="tfjs")
   ```

## Available models:
- **yolov8n**: Nano (fastest, ~6MB)
- **yolov8s**: Small (~22MB)  
- **yolov8m**: Medium (~52MB)
- **yolov8l**: Large (~87MB)
- **yolov8x**: Extra Large (~136MB)

The larger the model, the more accurate but slower it is.

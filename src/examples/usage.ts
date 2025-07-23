// Example usage of services in a Vue component

// 1. Import services

// 2. Service instances
const modelService = ModelService.getInstance();
const webcamService = WebcamService.getInstance();

// 3. Model loading
const loadModel = async () => {
  try {
    const { net, inputShape } = await modelService.loadModel(
      '/models/yolov8n_web_model/model.json',
      (progress) => console.log(`Loading: ${progress * 100}%`)
    );
    
    console.log('Model loaded:', { net, inputShape });
  } catch (error) {
    console.error('Loading error:', error);
  }
};

// 4. Image detection
const detectOnImage = async (imageElement, model, canvas) => {
  try {
    await modelService.detect(imageElement, model, canvas);
    console.log('Detection completed');
  } catch (error) {
    console.error('Detection error:', error);
  }
};

// 5. Webcam management
const handleWebcam = async (videoElement, enable) => {
  try {
    if (enable) {
      const stream = await webcamService.openWebcam(videoElement);
      console.log('Webcam opened:', stream);
    } else {
      webcamService.closeWebcam(videoElement);
      console.log('Webcam closed');
    }
  } catch (error) {
    console.error('Webcam error:', error);
  }
};

// 6. Usage with Pinia store

const useDetection = () => {
  const store = useAppStore();
  
  const initializeApp = async () => {
    // Load model
    store.setModelLoading(true);
    
    try {
      const { net, inputShape } = await loadModel();
      store.setModel(net, inputShape);
    } catch (error) {
      store.setError(`Error: ${error.message}`);
    }
  };
  
  return {
    initializeApp,
    detectOnImage,
    handleWebcam
  };
};

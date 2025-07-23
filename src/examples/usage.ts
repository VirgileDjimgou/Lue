// Exemple d'utilisation des services dans un composant Vue

// 1. Import des services
import { ModelService } from '@/services/modelService';
import { WebcamService } from '@/services/webcamService';

// 2. Instance des services
const modelService = ModelService.getInstance();
const webcamService = WebcamService.getInstance();

// 3. Chargement du modèle
const loadModel = async () => {
  try {
    const { net, inputShape } = await modelService.loadModel(
      '/models/yolov8n_web_model/model.json',
      (progress) => console.log(`Chargement: ${progress * 100}%`)
    );
    
    console.log('Modèle chargé:', { net, inputShape });
  } catch (error) {
    console.error('Erreur chargement:', error);
  }
};

// 4. Détection sur image
const detectOnImage = async (imageElement, model, canvas) => {
  try {
    await modelService.detect(imageElement, model, canvas);
    console.log('Détection terminée');
  } catch (error) {
    console.error('Erreur détection:', error);
  }
};

// 5. Gestion webcam
const handleWebcam = async (videoElement, enable) => {
  try {
    if (enable) {
      const stream = await webcamService.openWebcam(videoElement);
      console.log('Webcam ouverte:', stream);
    } else {
      webcamService.closeWebcam(videoElement);
      console.log('Webcam fermée');
    }
  } catch (error) {
    console.error('Erreur webcam:', error);
  }
};

// 6. Utilisation avec le store Pinia
import { useAppStore } from '@/stores/app';

const useDetection = () => {
  const store = useAppStore();
  
  const initializeApp = async () => {
    // Charger le modèle
    store.setModelLoading(true);
    
    try {
      const { net, inputShape } = await loadModel();
      store.setModel(net, inputShape);
    } catch (error) {
      store.setError(`Erreur: ${error.message}`);
    }
  };
  
  return {
    initializeApp,
    detectOnImage,
    handleWebcam
  };
};

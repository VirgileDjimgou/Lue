import { ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { ModelService } from '@/services/modelService';
import { WebcamService } from '@/services/webcamService';
import { useErrorHandler } from './useErrorHandler';

export const useDetection = () => {
  const store = useAppStore();
  const modelService = ModelService.getInstance();
  const webcamService = WebcamService.getInstance();
  const { handleAsyncError } = useErrorHandler();

  // État local
  const isInitializing = ref(false);
  const activeStream = ref<MediaStream | null>(null);

  // Computed
  const isModelReady = computed(() => store.isModelReady);
  const model = computed(() => store.model);
  const config = computed(() => store.config);

  // Initialisation du modèle
  const initializeModel = async () => {
    if (isInitializing.value || isModelReady.value) return;
    
    isInitializing.value = true;
    
    const result = await handleAsyncError(async () => {
      store.setModelLoading(true);
      
      const modelPath = `${window.location.origin}/models/${config.value.modelName}_web_model/model.json`;
      
      const { net, inputShape } = await modelService.loadModel(
        modelPath,
        (progress) => store.setModelLoading(true, progress)
      );

      store.setModel(net, inputShape);
      return true;
    }, 'Impossible de charger le modèle');

    isInitializing.value = false;
    return result !== null;
  };

  // Détection sur image
  const detectOnImage = async (file: File, imageElement: HTMLImageElement, canvas: HTMLCanvasElement) => {
    if (!isModelReady.value) {
      throw new Error('Le modèle n\'est pas encore chargé');
    }

    return handleAsyncError(async () => {
      const url = URL.createObjectURL(file);
      
      return new Promise<void>((resolve, reject) => {
        imageElement.onload = async () => {
          try {
            await modelService.detect(imageElement, model.value, canvas);
            URL.revokeObjectURL(url);
            store.setStream('image');
            resolve();
          } catch (error) {
            URL.revokeObjectURL(url);
            reject(error);
          }
        };
        
        imageElement.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Impossible de charger l\'image'));
        };
        
        imageElement.src = url;
      });
    }, 'Erreur lors de la détection sur image');
  };

  // Détection sur vidéo
  const detectOnVideo = async (file: File, videoElement: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    if (!isModelReady.value) {
      throw new Error('Le modèle n\'est pas encore chargé');
    }

    return handleAsyncError(async () => {
      const url = URL.createObjectURL(file);
      
      return new Promise<void>((resolve, reject) => {
        videoElement.onplay = async () => {
          try {
            await modelService.detectVideo(videoElement, model.value, canvas);
            store.setStream('video');
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        
        videoElement.onended = () => {
          URL.revokeObjectURL(url);
          store.resetStream();
        };
        
        videoElement.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Impossible de charger la vidéo'));
        };
        
        videoElement.src = url;
      });
    }, 'Erreur lors de la détection sur vidéo');
  };

  // Gestion webcam
  const toggleWebcam = async (videoElement: HTMLVideoElement, canvas: HTMLCanvasElement, enable: boolean) => {
    if (!isModelReady.value) {
      throw new Error('Le modèle n\'est pas encore chargé');
    }

    return handleAsyncError(async () => {
      if (enable) {
        const stream = await webcamService.openWebcam(videoElement);
        activeStream.value = stream;
        
        // Attendre que la vidéo soit prête
        await new Promise<void>((resolve) => {
          videoElement.onplay = async () => {
            await modelService.detectVideo(videoElement, model.value, canvas);
            store.setStream('camera');
            resolve();
          };
        });
      } else {
        webcamService.closeWebcam(videoElement);
        if (activeStream.value) {
          activeStream.value = null;
        }
        store.resetStream();
      }
    }, enable ? 'Impossible d\'ouvrir la webcam' : 'Erreur lors de la fermeture de la webcam');
  };

  // Nettoyage
  const cleanup = () => {
    if (activeStream.value) {
      activeStream.value.getTracks().forEach(track => track.stop());
      activeStream.value = null;
    }
    store.resetStream();
  };

  return {
    // État
    isInitializing,
    isModelReady,
    model,
    config,
    
    // Actions
    initializeModel,
    detectOnImage,
    detectOnVideo,
    toggleWebcam,
    cleanup
  };
};

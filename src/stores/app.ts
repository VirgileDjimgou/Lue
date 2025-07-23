import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ModelState, StreamState, AppConfig } from '@/types';
import { DETECTION_CONFIG } from '@/constants';

export const useAppStore = defineStore('app', () => {
  // State
  const model = ref<ModelState>({
    net: null,
    inputShape: [1, 0, 0, 3],
    isLoaded: false,
    isLoading: false,
    progress: 0
  });

  const stream = ref<StreamState>({
    type: null,
    isActive: false
  });

  const config = ref<AppConfig>({
    modelName: DETECTION_CONFIG.MODEL_NAME,
    modelPath: `/models/${DETECTION_CONFIG.MODEL_NAME}_web_model/model.json`,
    confidence: DETECTION_CONFIG.CONFIDENCE_THRESHOLD,
    iouThreshold: DETECTION_CONFIG.IOU_THRESHOLD,
    maxBoxes: DETECTION_CONFIG.MAX_BOXES
  });

  const error = ref<string | null>(null);

  // Getters
  const isModelReady = computed(() => model.value.isLoaded && !model.value.isLoading);
  const loadingProgress = computed(() => Math.round(model.value.progress * 100));

  // Actions
  const setModelLoading = (loading: boolean, progress: number = 0) => {
    model.value.isLoading = loading;
    model.value.progress = progress;
  };

  const setModel = (net: any, inputShape: number[]) => {
    model.value.net = net;
    model.value.inputShape = inputShape;
    model.value.isLoaded = true;
    model.value.isLoading = false;
    model.value.progress = 1;
  };

  const setStream = (type: StreamState['type'], isActive: boolean = true) => {
    stream.value.type = type;
    stream.value.isActive = isActive;
  };

  const setError = (message: string | null) => {
    error.value = message;
  };

  const resetStream = () => {
    stream.value.type = null;
    stream.value.isActive = false;
  };

  return {
    // State
    model,
    stream,
    config,
    error,
    // Getters
    isModelReady,
    loadingProgress,
    // Actions
    setModelLoading,
    setModel,
    setStream,
    setError,
    resetStream
  };
});

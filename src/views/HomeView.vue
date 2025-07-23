<template>
  <div class="home-view">
    <!-- Loading Overlay -->
    <LoadingOverlay
      :show="model.isLoading"
      :progress="loadingProgress"
      title="Chargement du modèle YOLOv8..."
    />

    <!-- Header -->
    <BContainer>
      <BRow>
        <BCol cols="12">
          <div class="text-center mb-4">
            <h1 class="display-4 text-white fw-bold mb-3">
              🚀 Détection d'Objets YOLOv8
            </h1>
            <p class="lead text-white-75 mb-4">
              Application de détection d'objets en temps réel dans le navigateur avec
              <strong>Vue 3</strong>, <strong>TypeScript</strong> et <strong>TensorFlow.js</strong>
            </p>
            <BBadge variant="info" class="me-2">
              Modèle: {{ config.modelName }}
            </BBadge>
            <BBadge 
              :variant="isModelReady ? 'success' : 'warning'"
            >
              {{ isModelReady ? 'Prêt' : 'Chargement...' }}
            </BBadge>
          </div>
        </BCol>
      </BRow>

      <!-- Error Alert -->
      <BRow v-if="error">
        <BCol cols="12">
          <BAlert variant="danger" dismissible @dismissed="clearError">
            <i class="fas fa-exclamation-triangle me-2"></i>
            {{ error }}
          </BAlert>
        </BCol>
      </BRow>

      <!-- Controls -->
      <BRow class="mb-4">
        <BCol cols="12">
          <MediaControls
            @image-selected="handleImageSelected"
            @video-selected="handleVideoSelected"
            @webcam-toggled="handleWebcamToggled"
          />
        </BCol>
      </BRow>

      <!-- Detection Viewer -->
      <BRow>
        <BCol cols="12">
          <DetectionViewer
            ref="detectionViewer"
          />
        </BCol>
      </BRow>

      <!-- Statistics -->
      <BRow v-if="isModelReady" class="mt-4">
        <BCol cols="12">
          <BCard class="stats-card">
            <BCardBody>
              <BRow class="text-center">
                <BCol cols="6" md="3">
                  <div class="stat-item">
                    <h4 class="stat-number">{{ config.modelName.toUpperCase() }}</h4>
                    <small class="text-muted">Modèle</small>
                  </div>
                </BCol>
                <BCol cols="6" md="3">
                  <div class="stat-item">
                    <h4 class="stat-number">{{ config.confidence * 100 }}%</h4>
                    <small class="text-muted">Confiance Min.</small>
                  </div>
                </BCol>
                <BCol cols="6" md="3">
                  <div class="stat-item">
                    <h4 class="stat-number">{{ model.inputShape[1] }}x{{ model.inputShape[2] }}</h4>
                    <small class="text-muted">Résolution</small>
                  </div>
                </BCol>
                <BCol cols="6" md="3">
                  <div class="stat-item">
                    <h4 class="stat-number">WebGL</h4>
                    <small class="text-muted">Backend</small>
                  </div>
                </BCol>
              </BRow>
            </BCardBody>
          </BCard>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BCardBody,
  BBadge,
  BAlert
} from 'bootstrap-vue-next';

import { useAppStore } from '@/stores/app';
import { ModelService } from '@/services/modelService';

import LoadingOverlay from '@/components/LoadingOverlay.vue';
import MediaControls from '@/components/MediaControls.vue';
import DetectionViewer from '@/components/DetectionViewer.vue';

const store = useAppStore();
const modelService = ModelService.getInstance();

// Refs
const detectionViewer = ref<InstanceType<typeof DetectionViewer>>();

// Computed
const model = computed(() => store.model);
const config = computed(() => store.config);
const error = computed(() => store.error);
const isModelReady = computed(() => store.isModelReady);
const loadingProgress = computed(() => store.loadingProgress);

// Methods
const initializeModel = async () => {
  try {
    store.setModelLoading(true);
    
    const modelPath = `${window.location.origin}/models/${config.value.modelName}_web_model/model.json`;
    
    const { net, inputShape } = await modelService.loadModel(
      modelPath,
      (progress) => store.setModelLoading(true, progress)
    );

    store.setModel(net, inputShape);
    store.setError(null);
  } catch (error) {
    console.error('Erreur lors du chargement du modèle:', error);
    store.setError(`Impossible de charger le modèle: ${error}`);
  }
};

const handleImageSelected = (file: File) => {
  detectionViewer.value?.handleImageFile(file);
};

const handleVideoSelected = (file: File) => {
  detectionViewer.value?.handleVideoFile(file);
};

const handleWebcamToggled = (enabled: boolean) => {
  detectionViewer.value?.handleWebcam(enabled);
};

const clearError = () => {
  store.setError(null);
};

// Lifecycle
onMounted(() => {
  initializeModel();
});
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  padding: 2rem 0;
}

.text-white-75 {
  color: rgba(255, 255, 255, 0.75);
}

.stats-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057;
  margin-bottom: 0.25rem;
}
</style>

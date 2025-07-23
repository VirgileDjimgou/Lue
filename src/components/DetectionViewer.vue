<template>
  <BCard class="detection-viewer-card">
    <BCardHeader>
      <h5 class="mb-0">🔍 Detection Zone</h5>
      <small v-if="stream.type" class="text-muted">
        Active source: {{ getSourceLabel(stream.type) }}
      </small>
    </BCardHeader>
    <BCardBody>
      <div class="detection-container">
        <!-- Image Display -->
        <img
          ref="imageRef"
          class="media-element"
          :class="{ active: stream.type === 'image' }"
          @load="onImageLoad"
          alt="Image to analyze"
        />

        <!-- Video Display -->
        <video
          ref="videoRef"
          class="media-element"
          :class="{ active: stream.type === 'video' }"
          autoplay
          muted
          controls
          @play="onVideoPlay"
          @ended="onVideoEnded"
        ></video>

        <!-- Webcam Display -->
        <video
          ref="cameraRef"
          class="media-element"
          :class="{ active: stream.type === 'camera' }"
          autoplay
          muted
          @play="onCameraPlay"
        ></video>

        <!-- Detection Canvas -->
        <canvas
          ref="canvasRef"
          class="detection-canvas"
          :width="canvasSize.width"
          :height="canvasSize.height"
        ></canvas>

        <!-- Placeholder -->
        <div
          v-if="!stream.type"
          class="placeholder-content"
        >
          <div class="text-center">
            <i class="fas fa-camera fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Select a source to begin</h5>
            <p class="text-muted">
              Choose an image, video or enable webcam to detect objects
            </p>
          </div>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { BCard, BCardHeader, BCardBody } from 'bootstrap-vue-next';
import { useAppStore } from '@/stores/app';
import { ModelService } from '@/services/modelService';
import { WebcamService } from '@/services/webcamService';
import type { StreamState } from '@/types';

const store = useAppStore();
const modelService = ModelService.getInstance();
const webcamService = WebcamService.getInstance();

// Template refs
const imageRef = ref<HTMLImageElement>();
const videoRef = ref<HTMLVideoElement>();
const cameraRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();

// Computed
const stream = computed(() => store.stream);
const model = computed(() => store.model);

const canvasSize = computed(() => {
  const inputShape = model.value.inputShape;
  return {
    width: inputShape[2] || 640,
    height: inputShape[1] || 640
  };
});

// Methods
const getSourceLabel = (type: StreamState['type']): string => {
  switch (type) {
    case 'image': return 'Image';
    case 'video': return 'Video';
    case 'camera': return 'Webcam';
    default: return 'None';
  }
};

const onImageLoad = async () => {
  if (imageRef.value && canvasRef.value && model.value.isLoaded) {
    try {
      await modelService.detect(imageRef.value, model.value, canvasRef.value);
    } catch (error) {
      console.error('Error during image detection:', error);
      store.setError(`Detection error: ${error}`);
    }
  }
};

const onVideoPlay = async () => {
  if (videoRef.value && canvasRef.value && model.value.isLoaded) {
    try {
      await modelService.detectVideo(videoRef.value, model.value, canvasRef.value);
    } catch (error) {
      console.error('Error during video detection:', error);
      store.setError(`Detection error: ${error}`);
    }
  }
};

const onVideoEnded = () => {
  store.resetStream();
};

const onCameraPlay = async () => {
  if (cameraRef.value && canvasRef.value && model.value.isLoaded) {
    try {
      await modelService.detectVideo(cameraRef.value, model.value, canvasRef.value);
    } catch (error) {
      console.error('Error during webcam detection:', error);
      store.setError(`Detection error: ${error}`);
    }
  }
};

// Image handling
const handleImageFile = (file: File) => {
  if (imageRef.value) {
    const url = URL.createObjectURL(file);
    imageRef.value.src = url;
    store.setStream('image');
  }
};

// Video handling
const handleVideoFile = (file: File) => {
  if (videoRef.value) {
    const url = URL.createObjectURL(file);
    videoRef.value.src = url;
    store.setStream('video');
  }
};

// Webcam handling
const handleWebcam = async (enabled: boolean) => {
  if (!cameraRef.value) return;

  try {
    if (enabled) {
      await webcamService.openWebcam(cameraRef.value);
      store.setStream('camera');
    } else {
      webcamService.closeWebcam(cameraRef.value);
      store.resetStream();
    }
  } catch (error) {
    console.error('Webcam error:', error);
    store.setError(`Webcam error: ${error}`);
  }
};

// Watch for stream changes to hide other elements
watch(() => stream.value.type, (newType) => {
  if (imageRef.value) {
    imageRef.value.style.display = newType === 'image' ? 'block' : 'none';
  }
  if (videoRef.value) {
    videoRef.value.style.display = newType === 'video' ? 'block' : 'none';
  }
  if (cameraRef.value) {
    cameraRef.value.style.display = newType === 'camera' ? 'block' : 'none';
  }
  
  // Clear canvas when switching
  if (canvasRef.value && newType === null) {
    const ctx = canvasRef.value.getContext('2d');
    ctx?.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  }
});

// Expose methods to parent
defineExpose({
  handleImageFile,
  handleVideoFile,
  handleWebcam
});
</script>

<style scoped>
.detection-viewer-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.detection-container {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.media-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: none;
}

.media-element.active {
  display: block;
}

.detection-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.placeholder-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 5;
}

.placeholder-content i {
  opacity: 0.5;
}
</style>

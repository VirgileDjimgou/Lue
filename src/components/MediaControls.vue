<template>
  <BCard class="media-controls-card">
    <BCardHeader>
      <h5 class="mb-0">📥 Sources de Détection</h5>
    </BCardHeader>
    <BCardBody>
      <div class="d-flex flex-wrap gap-2">
        <!-- Image Upload -->
        <div class="control-group">
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handleImageUpload"
          />
          <BButton
            :variant="stream.type === 'image' ? 'danger' : 'primary'"
            @click="toggleImage"
            :disabled="!isModelReady"
          >
            <i :class="stream.type === 'image' ? 'fas fa-times' : 'fas fa-image'"></i>
            {{ stream.type === 'image' ? 'Fermer' : 'Ouvrir' }} Image
          </BButton>
        </div>

        <!-- Video Upload -->
        <div class="control-group">
          <input
            ref="videoInput"
            type="file"
            accept="video/*"
            class="d-none"
            @change="handleVideoUpload"
          />
          <BButton
            :variant="stream.type === 'video' ? 'danger' : 'success'"
            @click="toggleVideo"
            :disabled="!isModelReady"
          >
            <i :class="stream.type === 'video' ? 'fas fa-times' : 'fas fa-video'"></i>
            {{ stream.type === 'video' ? 'Fermer' : 'Ouvrir' }} Vidéo
          </BButton>
        </div>

        <!-- Webcam -->
        <div class="control-group">
          <BButton
            :variant="stream.type === 'camera' ? 'danger' : 'warning'"
            @click="toggleWebcam"
            :disabled="!isModelReady || !isWebcamSupported"
          >
            <i :class="stream.type === 'camera' ? 'fas fa-times' : 'fas fa-camera'"></i>
            {{ stream.type === 'camera' ? 'Fermer' : 'Ouvrir' }} Webcam
          </BButton>
        </div>
      </div>

      <div v-if="!isWebcamSupported" class="mt-2">
        <small class="text-warning">
          <i class="fas fa-exclamation-triangle"></i>
          Webcam non supportée par ce navigateur
        </small>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BCard, BCardHeader, BCardBody, BButton } from 'bootstrap-vue-next';
import { useAppStore } from '@/stores/app';
import { WebcamService } from '@/services/webcamService';

const emit = defineEmits<{
  imageSelected: [file: File];
  videoSelected: [file: File];
  webcamToggled: [enabled: boolean];
}>();

const store = useAppStore();
const webcamService = WebcamService.getInstance();

const imageInput = ref<HTMLInputElement>();
const videoInput = ref<HTMLInputElement>();

const isModelReady = computed(() => store.isModelReady);
const stream = computed(() => store.stream);
const isWebcamSupported = computed(() => webcamService.isWebcamSupported());

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit('imageSelected', file);
  }
};

const handleVideoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit('videoSelected', file);
  }
};

const toggleImage = () => {
  if (stream.value.type === 'image') {
    store.resetStream();
  } else {
    if (stream.value.type !== null) {
      store.resetStream();
    }
    imageInput.value?.click();
  }
};

const toggleVideo = () => {
  if (stream.value.type === 'video') {
    store.resetStream();
  } else {
    if (stream.value.type !== null) {
      store.resetStream();
    }
    videoInput.value?.click();
  }
};

const toggleWebcam = () => {
  if (stream.value.type === 'camera') {
    emit('webcamToggled', false);
    store.resetStream();
  } else {
    if (stream.value.type !== null) {
      store.resetStream();
    }
    emit('webcamToggled', true);
  }
};
</script>

<style scoped>
.media-controls-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.control-group {
  min-width: 120px;
}

.btn {
  white-space: nowrap;
  min-width: 120px;
}

.btn i {
  margin-right: 8px;
}
</style>

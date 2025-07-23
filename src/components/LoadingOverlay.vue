<template>
  <div v-if="show" class="loader-overlay">
    <div class="loader-content">
      <div class="spinner-container">
        <BSpinner variant="light" label="Chargement..." class="loader-spinner" />
      </div>
      <h4 class="text-white mt-3">{{ title }}</h4>
      <BProgressBar
        :value="progress"
        variant="info"
        striped
        animated
        class="mt-2 loader-progress"
      />
      <p class="text-white-50 mt-2">{{ progress.toFixed(1) }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BSpinner, BProgressBar } from 'bootstrap-vue-next';

interface Props {
  show: boolean;
  progress: number;
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Chargement du modèle...'
});
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.loader-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.spinner-container {
  display: flex;
  justify-content: center;
}

.loader-spinner {
  width: 3rem;
  height: 3rem;
}

.loader-progress {
  width: 300px;
  height: 8px;
}
</style>

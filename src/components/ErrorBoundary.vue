<template>
  <Teleport to="body">
    <div v-if="error" class="error-boundary-overlay" @click="clearError">
      <div class="error-boundary-modal" @click.stop>
        <div class="error-header">
          <h4>
            <i class="fas fa-exclamation-triangle text-warning me-2"></i>
            Une erreur s'est produite
          </h4>
          <BButton
            variant="outline-secondary"
            size="sm"
            @click="clearError"
          >
            <i class="fas fa-times"></i>
          </BButton>
        </div>
        
        <div class="error-body">
          <p class="mb-3">{{ error }}</p>
          
          <details v-if="errorDetails" class="error-details">
            <summary>Détails techniques</summary>
            <pre><code>{{ errorDetails }}</code></pre>
          </details>
        </div>
        
        <div class="error-footer">
          <BButton variant="primary" @click="clearError">
            Fermer
          </BButton>
          <BButton 
            variant="outline-secondary" 
            @click="reloadPage"
            class="ms-2"
          >
            Recharger la page
          </BButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BButton } from 'bootstrap-vue-next';
import { useAppStore } from '@/stores/app';

const store = useAppStore();

interface Props {
  errorDetails?: string;
}

defineProps<Props>();

const error = computed(() => store.error);

const clearError = () => {
  store.setError(null);
};

const reloadPage = () => {
  window.location.reload();
};
</script>

<style scoped>
.error-boundary-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
}

.error-boundary-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: errorSlideIn 0.3s ease-out;
}

@keyframes errorSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.error-header h4 {
  margin: 0;
  color: #495057;
}

.error-body {
  padding: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.error-details {
  margin-top: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.error-details summary {
  padding: 0.5rem;
  background: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #e9ecef;
}

.error-details pre {
  margin: 0;
  padding: 1rem;
  background: #f8f9fa;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.error-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
  display: flex;
  justify-content: flex-end;
}
</style>

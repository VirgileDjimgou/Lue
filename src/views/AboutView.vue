<template>
  <BContainer>
    <BRow>
      <BCol cols="12" lg="8" class="mx-auto">
        <BCard class="about-card">
          <BCardHeader>
            <h2 class="mb-0">📚 À Propos</h2>
          </BCardHeader>
          <BCardBody>
            <div class="text-center mb-4">
              <img 
                src="/vite.svg" 
                alt="Vue Logo" 
                class="tech-logo"
              />
              <h3 class="mt-3">YOLOv8 Vue.js Detection App</h3>
              <p class="lead text-muted">
                Application moderne de détection d'objets en temps réel
              </p>
            </div>

            <hr />

            <BRow class="mb-4">
              <BCol cols="12" md="6">
                <h4>🛠️ Technologies Utilisées</h4>
                <BListGroup>
                  <BListGroupItem>
                    <strong>Vue 3</strong> - Framework progressif JavaScript
                  </BListGroupItem>
                  <BListGroupItem>
                    <strong>TypeScript</strong> - Typage statique
                  </BListGroupItem>
                  <BListGroupItem>
                    <strong>Vite</strong> - Build tool moderne
                  </BListGroupItem>
                  <BListGroupItem>
                    <strong>Pinia</strong> - Gestion d'état
                  </BListGroupItem>
                  <BListGroupItem>
                    <strong>Bootstrap Vue Next</strong> - UI Components
                  </BListGroupItem>
                  <BListGroupItem>
                    <strong>TensorFlow.js</strong> - Machine Learning
                  </BListGroupItem>
                </BListGroup>
              </BCol>
              <BCol cols="12" md="6">
                <h4>🎯 Fonctionnalités</h4>
                <BListGroup>
                  <BListGroupItem>
                    <i class="fas fa-image text-primary me-2"></i>
                    Détection sur images
                  </BListGroupItem>
                  <BListGroupItem>
                    <i class="fas fa-video text-success me-2"></i>
                    Détection sur vidéos
                  </BListGroupItem>
                  <BListGroupItem>
                    <i class="fas fa-camera text-warning me-2"></i>
                    Détection webcam temps réel
                  </BListGroupItem>
                  <BListGroupItem>
                    <i class="fas fa-brain text-info me-2"></i>
                    Modèle YOLOv8 optimisé
                  </BListGroupItem>
                  <BListGroupItem>
                    <i class="fas fa-mobile text-secondary me-2"></i>
                    Interface responsive
                  </BListGroupItem>
                  <BListGroupItem>
                    <i class="fas fa-shield-alt text-danger me-2"></i>
                    Type safety complète
                  </BListGroupItem>
                </BListGroup>
              </BCol>
            </BRow>

            <hr />

            <div class="mb-4">
              <h4>📊 Modèle YOLOv8</h4>
              <p>
                Cette application utilise le modèle YOLOv8 (You Only Look Once version 8) 
                pour la détection d'objets en temps réel. Le modèle peut détecter 
                <strong>80 classes d'objets</strong> différents du dataset COCO.
              </p>
              
              <BRow class="mt-3">
                <BCol cols="6" md="3">
                  <BCard class="stat-card text-center">
                    <BCardBody>
                      <h5>80</h5>
                      <small>Classes</small>
                    </BCardBody>
                  </BCard>
                </BCol>
                <BCol cols="6" md="3">
                  <BCard class="stat-card text-center">
                    <BCardBody>
                      <h5>~13MB</h5>
                      <small>Taille</small>
                    </BCardBody>
                  </BCard>
                </BCol>
                <BCol cols="6" md="3">
                  <BCard class="stat-card text-center">
                    <BCardBody>
                      <h5>WebGL</h5>
                      <small>Backend</small>
                    </BCardBody>
                  </BCard>
                </BCol>
                <BCol cols="6" md="3">
                  <BCard class="stat-card text-center">
                    <BCardBody>
                      <h5>640x640</h5>
                      <small>Input</small>
                    </BCardBody>
                  </BCard>
                </BCol>
              </BRow>
            </div>

            <hr />

            <div class="text-center">
              <h4>🔗 Liens Utiles</h4>
              <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
                <BButton 
                  variant="outline-primary" 
                  href="https://vuejs.org" 
                  target="_blank"
                >
                  <i class="fab fa-vuejs me-2"></i>Vue.js
                </BButton>
                <BButton 
                  variant="outline-info" 
                  href="https://www.tensorflow.org/js" 
                  target="_blank"
                >
                  <i class="fas fa-brain me-2"></i>TensorFlow.js
                </BButton>
                <BButton 
                  variant="outline-success" 
                  href="https://github.com/ultralytics/ultralytics" 
                  target="_blank"
                >
                  <i class="fab fa-github me-2"></i>YOLOv8
                </BButton>
                <BButton 
                  variant="outline-secondary" 
                  href="https://pinia.vuejs.org" 
                  target="_blank"
                >
                  <i class="fas fa-store me-2"></i>Pinia
                </BButton>
              </div>
            </div>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardBody,
  BListGroup,
  BListGroupItem,
  BButton
} from 'bootstrap-vue-next';
</script>

<style scoped>
.about-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.tech-logo {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.stat-card {
  background: rgba(248, 249, 250, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.stat-card h5 {
  margin-bottom: 0.25rem;
  color: #495057;
  font-weight: bold;
}

.list-group-item {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.btn {
  margin: 0.25rem;
}
</style>

<template>
  <div id="app">
    <NavBar />
    <div class="container-fluid">
      <RouterView />
    </div>
    <ErrorBoundary />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';
</script>

<style>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container-fluid {
  padding-top: 20px;
}
</style>

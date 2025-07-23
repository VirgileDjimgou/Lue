<template>
  <BNavbar variant="dark" type="dark" class="shadow">
    <BContainer>
      <BNavbarBrand to="/" class="fw-bold">
        📷 YOLOv8 Vue.js Detection
      </BNavbarBrand>
      
      <BNavbarNav class="ms-auto">
        <BNavItem to="/" exact>Home</BNavItem>
        <BNavItem to="/about">About</BNavItem>
      </BNavbarNav>
    </BContainer>
  </BNavbar>
</template>

<script setup lang="ts">
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BContainer } from 'bootstrap-vue-next';
</script>

<style scoped>
.navbar {
  background: rgba(0, 0, 0, 0.9) !important;
  backdrop-filter: blur(10px);
}

.navbar-brand {
  font-size: 1.5rem;
}
</style>

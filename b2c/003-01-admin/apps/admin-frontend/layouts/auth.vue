<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>


<script setup lang="ts">
// Minimal, no sidebar/topbar
</script>


<style scoped>
.auth-layout {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f8fafc, #eef2f7);
  padding: 2rem;
}
</style>

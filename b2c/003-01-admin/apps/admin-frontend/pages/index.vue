<template>
  <div>
    <h2>Home</h2>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const store = useAuthStore();
const message = ref('');

onMounted(async () => {
  const { $api } = useNuxtApp() as any;
  const { data } = await $api.get('/welcome');
  message.value = data.message;
});
</script>

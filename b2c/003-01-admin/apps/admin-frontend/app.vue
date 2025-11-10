<template>
  <main class="min-h-screen grid place-items-center">
    <div class="p-6 rounded-xl shadow bg-white">
      <h1 class="text-2xl font-bold">Admin Frontend</h1>
      <p class="mt-2 text-gray-600">API says:</p>
      <p class="mt-4 font-mono">{{ status }}</p>
    </div>
  </main>
</template>


<script setup lang="ts">
const config = useRuntimeConfig();
const base = config.INTERNAL_ADMIN_API_URL as string;
const { data, error } = await useFetch<string>(`${base}/status`, { server: true });
const status = data.value ?? (error.value ? 'N/A' : '');
</script>


<style>
/* Tailwind optionnel dans une étape suivante */
</style>

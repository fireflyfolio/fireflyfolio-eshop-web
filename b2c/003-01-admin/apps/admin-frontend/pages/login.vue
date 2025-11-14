<template>
  <div class="auth">
    <h1>Sign in</h1>
    <form @submit.prevent="submit">
      <input v-model="login" placeholder="Email or login" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign in</button>
    </form>
    <NuxtLink to="/forgot-password">Forgot password?</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
definePageMeta({ layout: 'auth' });
const store = useAuthStore();
const login = ref('test');
const password = ref('test');
const submit = async () => {
  await store.login(login.value, password.value);
  await navigateTo('/');
};
</script>

<style scoped>
.auth {
  width: 100%;
  max-width: 380px;
  margin: 10vh auto;
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, .05);
}

.auth input {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: .5rem 0;
  padding: .6rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.auth button {
  width: 100%;
  padding: .6rem;
  border: none;
  border-radius: 8px;
  background: #111;
  color: white;
}
</style>

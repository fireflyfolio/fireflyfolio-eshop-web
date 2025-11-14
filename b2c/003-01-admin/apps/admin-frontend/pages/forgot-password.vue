<template>
  <div class="auth">
    <h1>Forgot password</h1>
    <div v-if="sent">
      <p>We sent a reset link if the email exists. Go back to <NuxtLink to="/login">login</NuxtLink>.</p>
    </div>
    <form v-else @submit.prevent="send">
      <input v-model="email" type="email" placeholder="Your email" required />
      <button type="submit">Send reset link</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' });
const email = ref('');
const sent = ref(false);
const send = () => { sent.value = true; };
</script>

<style scoped>
.auth {
  max-width: 360px;
  margin: 10vh auto;
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, .05)
}

.auth input {
  width: 100%;
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

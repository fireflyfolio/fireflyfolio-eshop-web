<template>
  <div class="app">
    <aside :class="['sidebar', { collapsed }]">
      <div class="search">
        <input v-model="q" placeholder="Search" />
      </div>
      <nav>
        <NuxtLink to="/">🏠 Home</NuxtLink>
        <NuxtLink to="/catalog">🗂️ Catalog</NuxtLink>
      </nav>
    </aside>

    <main>
      <header class="topbar">
        <button @click="collapsed = !collapsed" aria-label="Toggle sidebar">☰</button>
        <span class="page">{{ pageTitle }}</span>
        <div class="spacer" />
        <button aria-label="Notifications">🔔</button>
        <div class="menu">
          <details>
            <summary>{{ userName }}</summary>
            <ul>
              <li>
                <NuxtLink to="/profile">Profile</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/settings">Settings</NuxtLink>
              </li>
              <li><button @click="logout">Logout</button></li>
            </ul>
          </details>
        </div>
      </header>
      <section class="content">
        <slot />
      </section>
    </main>
  </div>
</template>


<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const route = useRoute();
const store = useAuthStore();
const collapsed = ref(false);
const q = ref('');
const pageTitle = computed(() => route.name?.toString() ?? 'Home');
const userName = computed(() => store.user?.displayName ?? 'User');
const logout = () => store.logout();
</script>


<style scoped>
.app {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #111;
  color: #eee;
  padding: 1rem;
  transition: width .2s;
}

.sidebar.collapsed {
  width: 64px;
  overflow: hidden;
}

.sidebar nav a {
  display: block;
  padding: .5rem 0;
  color: #eee;
  text-decoration: none;
}

main {
  background: #f6f7fb;
  display: grid;
  grid-template-rows: 56px 1fr;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 .75rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.topbar .spacer {
  flex: 1;
}

.content {
  padding: 1rem;
}

.search input {
  width: 100%;
  padding: .5rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: #222;
  color: #eee;
}
</style>

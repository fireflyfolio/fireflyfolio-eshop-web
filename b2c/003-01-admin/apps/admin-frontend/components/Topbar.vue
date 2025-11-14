<template>
  <header class="topbar">
    <button @click="$emit('toggleSidebar')" aria-label="Toggle sidebar" class="icon">☰</button>
    <span class="page">{{ pageTitle }}</span>
    <div class="spacer" />
    <button class="icon" aria-label="Notifications">🔔</button>
    <details class="menu">
      <summary>{{ userName }}</summary>
      <ul class="dropdown">
        <li>
          <NuxtLink to="/profile">Profile</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/settings">Settings</NuxtLink>
        </li>
        <li><button @click="$emit('logout')">Logout</button></li>
      </ul>
    </details>
  </header>
</template>


<script setup lang="ts">
const props = defineProps<{ pageTitle?: string; userName?: string }>();
const pageTitle = computed(() => props.pageTitle ?? 'Home');
const userName = computed(() => props.userName ?? 'User');
</script>


<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 .75rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 20;
}

.topbar .spacer {
  flex: 1;
}

.icon {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}

.menu {
  position: relative;
}

.menu summary {
  list-style: none;
  cursor: pointer;
  padding: .35rem .6rem;
  border-radius: 8px;
}

.menu[open] summary,
.menu summary:hover {
  background: #f3f4f6;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 120%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: .25rem;
  min-width: 180px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, .08);
  list-style: none;
  margin: 0;
  z-index: 30;
}

.dropdown li {
  list-style: none;
}

.dropdown a,
.dropdown button {
  display: block;
  width: 100%;
  text-align: left;
  padding: .6rem .8rem;
  background: transparent;
  border: none;
  color: #111;
  text-decoration: none;
  border-radius: 8px;
}

.dropdown a:hover,
.dropdown button:hover {
  background: #f3f4f6;
}
</style>

<template>
  <aside :class="['sidebar', { collapsed }]" :style="{ width: width }">
    <div class="search">
      <input v-model="keyword" placeholder="Search" />
    </div>
    <nav>
      <NuxtLink to="/">🏠 Home</NuxtLink>
      <NuxtLink to="/catalog">🗂️ Catalog</NuxtLink>
    </nav>
  </aside>
</template>


<script setup lang="ts">
const props = defineProps<{ collapsed?: boolean }>();
const keyword = ref('');
const collapsed = computed(() => !!props.collapsed);
const width = computed(() => (collapsed.value ? '64px' : '260px'));
</script>


<style scoped>
.sidebar {
  background: #111;
  color: #eee;
  padding: 1rem;
  transition: width .2s;
  min-height: 100vh;
  overflow: hidden;
}

.sidebar nav a {
  display: block;
  padding: .5rem 0;
  color: #eee;
  text-decoration: none;
  border-radius: 6px;
}

.sidebar nav a:hover {
  background: #1b1b1b;
}

.search {
  margin-bottom: .75rem;
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

<template>
  <aside :class="['sidebar', { collapsed }]" :style="{ width }" aria-label="Main navigation">
    <!-- Search area: input when expanded, icon-only when collapsed -->
    <div class="search">
      <template v-if="!collapsed">
        <input v-model="keyword" placeholder="Search" />
      </template>
      <template v-else>
        <button class="icon" aria-label="Open search" title="Search" @click="$emit('requestExpand')">🔍</button>
      </template>
    </div>

    <!-- Navigation items: icon + label, label hidden when collapsed -->
    <nav>
      <NuxtLink class="item" to="/" aria-label="Home">
        <span class="ico">🏠</span>
        <span class="label">Home</span>
      </NuxtLink>
      <NuxtLink class="item" to="/catalog" aria-label="Catalog">
        <span class="ico">🗂️</span>
        <span class="label">Catalog</span>
      </NuxtLink>
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
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.sidebar.collapsed {
  align-items: center;
}

.search {
  margin-bottom: .25rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.search input {
  width: 100%;
  padding: .5rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: #222;
  color: #eee;
}

.icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  cursor: pointer;
}

nav {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.item {
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .5rem .6rem;
  color: #eee;
  text-decoration: none;
  border-radius: 8px;
}

.item:hover {
  background: #1b1b1b;
}

.sidebar.collapsed .item {
  justify-content: center;
  padding: .5rem 0;
}

.label {
  white-space: nowrap;
}

.sidebar.collapsed .label {
  display: none;
}

.ico {
  font-size: 1.1rem;
  line-height: 1;
}

.search {
  margin-bottom: .25rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.search input {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: .5rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: #222;
  color: #eee;
}
</style>

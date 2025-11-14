<template>
  <div class="app" :style="{ gridTemplateColumns: sidebarWidth + ' 1fr' }">
    <Sidebar v-if="isAuthenticated" :collapsed="collapsed" @requestExpand="collapsed = false" />

    <main>
      <Topbar v-if="isAuthenticated" :page-title="pageTitle" :user-name="userName"
        @toggleSidebar="collapsed = !collapsed" @logout="logout" />

      <section class="content">
        <slot />
      </section>
    </main>
  </div>
</template>


<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
import Topbar from '@/components/Topbar.vue';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const store = useAuthStore();

const collapsed = ref(false);
const sidebarWidth = computed(() => (collapsed.value ? '64px' : '260px'));

const pageTitle = computed(() => route.name?.toString() ?? 'Home');
const userName = computed(() => store.user?.displayName ?? 'User');
const logout = () => store.logout();

const isAuthenticated = computed(() => !!store.user);
</script>


<style scoped>
.app {
  display: grid;
  min-height: 100vh;
}

main {
  background: #f6f7fb;
  display: grid;
  grid-template-rows: 56px 1fr;
}

.content {
  padding: 1rem;
}
</style>

import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useAuthStore();

  if (!store.token) store.restore();
  const isAuthPage = to.path.startsWith('/login') || to.path.startsWith('/forgot-password');

  if (!store.token && !isAuthPage) {
    return navigateTo('/login');
  }
});


import { defineStore } from 'pinia';

interface User { id: string; login: string; displayName: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null as string | null, user: null as User | null }),
  actions: {
    async login(login: string, password: string) {
      const { $api } = useNuxtApp() as any;
      const { data } = await $api.post('/auth/login', { login, password });
      this.token = data.accessToken;
      if (process.client) localStorage.setItem('token', this.token!);
      await this.fetchMe();
    },
    async fetchMe() {
      const { $api } = useNuxtApp() as any;
      const { data } = await $api.get('/auth/me');
      this.user = data;
    },
    async logout() {
      const { $api } = useNuxtApp() as any;
      try {
        const payload = JSON.parse(atob(this.token!.split('.')[1]));
        await $api.post('/auth/logout', { exp: payload.exp });
      } catch { }
      this.token = null; this.user = null;
      if (process.client) localStorage.removeItem('token');
      await navigateTo('/login');
    },
    restore() {
      if (process.client) {
        const t = localStorage.getItem('token');
        if (t) this.token = t;
      }
    }
  }
});

import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'nuxt dev -p 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI
  },
  testDir: 'tests/e2e'
});

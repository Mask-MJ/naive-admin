import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { setupRouterGuard } from './permissionGuard';

export const router = createRouter({
  history: createWebHashHistory(),
  extendRoutes: (routes) => setupLayouts(routes),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
}

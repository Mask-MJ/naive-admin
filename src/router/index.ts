import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { setupRouterGuard } from './permissionGuard';
export const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => {
    // 把路由拆分成 登录页 和 非登录页
    const loginIndex = routes.findIndex((route) => route.path === '/login');
    const loginRoutes = routes.splice(loginIndex, 1);
    return [...setupLayouts(routes), ...loginRoutes];
  },
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
}

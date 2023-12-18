import type { Router } from 'vue-router/auto';

import { PageEnum } from '@/settings';

function createPageGuard(router: Router) {
  const controller = new AbortController();

  router.beforeEach(async () => {
    window.$loadingBar?.start();
    controller.abort();
    return true;
  });
  router.afterEach(() => {
    window.$loadingBar?.finish();
  });
}

function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  const routerStore = useRouterStore();

  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;

    if (PageEnum.BASE_LOGIN === to.path) {
      if (to.path === PageEnum.BASE_LOGIN && token) {
        // 如果前往登录页面,并且有登录态
        try {
          await userStore.afterLoginAction();
          next((to.query?.redirect as string) || PageEnum.BASE_HOME);
          return;
        } catch {}
      }
      next();
      return;
    }
    if (!token) {
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: PageEnum.BASE_LOGIN,
        replace: true,
      };
      if (to.path) redirectData.query = { ...redirectData.query, redirect: to.path };

      next(redirectData);
      return;
    }

    // 如果来自登录页,并且要前往404页,重定向到首页
    if (
      from.path === PageEnum.BASE_LOGIN &&
      to.name === 'all' &&
      to.fullPath !== PageEnum.BASE_HOME
    ) {
      next(PageEnum.BASE_HOME);
      return;
    }

    // 前往根路径, 重定向到首页
    if (to.path === '/') {
      next(PageEnum.BASE_HOME);
      return;
    }

    // 判断是否存有用户信息
    if (Object.keys(userStore.getUserInfo).length === 0) {
      await userStore.getUserInfoAction();
    }
    // 判断是否已经异步添加路由
    if (routerStore.isDynamicAddedRoute) {
      // 判断是否有权限访问
      if (routerStore.getIsPermission(to.path)) {
        next();
      } else {
        next({ path: PageEnum.BASE_HOME });
      }
      return;
    }
    // 异步添加路由
    await routerStore.buildRoutesAction();
    routerStore.setDynamicAddedRoute(true);
    next({ ...to, replace: true });
  });
}

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPermissionGuard(router);
}

import type { Menu } from '../helper/router-helper';
import type { RouteRecordRaw } from 'vue-router/auto';

import { defineStore } from 'pinia';

import { getRouteList } from '@/api/menu';
import { router } from '@/router';

import { flatRoutes, transformRouteToMenu } from '../helper/router-helper';

export interface RouterState {
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // 菜单列表
  menuList: Menu[];
  // 后台返回的路由列表
  backendRouteList: RouteRecordRaw[];
  // 缓存路由页面
  cacheRoutes: string[];
}

export const useRouterStore = defineStore('router-store', {
  state: (): RouterState => ({
    isDynamicAddedRoute: false,
    menuList: [],
    backendRouteList: [],
    cacheRoutes: [],
  }),
  getters: {
    getIsPermission(state) {
      return (path: string): boolean => {
        // 扁平化后台返回的路由列表
        return flatRoutes(state.backendRouteList).some((route) => route.path === path);
      };
    },
  },
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list;
    },
    setCacheRoutes(list: string[]) {
      this.cacheRoutes = list;
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.menuList = [];
    },
    // 构建路由
    async buildRoutesAction() {
      // 获取后台路由
      this.backendRouteList = await getRouteList();
      // 获取文件路由
      const routes = router.getRoutes().filter((route) => route.name);
      // 对比后台返回的路由和文件路由
      // 如果 path 相同,则将文件路由的 meta 属性合并到后台返回的路由中
      flatRoutes(this.backendRouteList).forEach((backendRoute) => {
        const route = routes.find((route) => route.path === backendRoute.path);
        if (route) {
          route.meta = {
            ...(route.meta || {}),
            ...(backendRoute.meta || {}),
          };
        }
      });

      const { initHomeTab } = useMultipleTabStore();
      // 初始化首页路由
      initHomeTab();

      // 转换为菜单列表
      this.menuList = transformRouteToMenu(this.backendRouteList);
    },
  },
});

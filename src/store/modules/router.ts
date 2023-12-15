import type { RouteRecordRaw } from 'vue-router/auto';
import { defineStore } from 'pinia';
import { transformRouteToMenu, type Menu } from '../helper/router-helper';
import { getRouteList } from '@/api/menu';
import { flatMapDeep } from 'lodash-es';

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
  actions: {
    getIsPermission(path: string): boolean {
      // 获取当前文件路由列表
      // 获取后台返回的路由列表
      // 对比后台返回的路由列表和文件路由列表
      const backendRouteList = this.backendRouteList;
      // 扁平化后台返回的路由列表
      const flatBackendRouteList = flatMapDeep(backendRouteList, (route) => {
        if (route.children && route.children.length) {
          return route.children;
        }
        return route;
      });

      return flatBackendRouteList.some((route) => route.path === path);
    },
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

      // 转换为菜单列表
      this.menuList = transformRouteToMenu(this.backendRouteList);
    },
  },
});

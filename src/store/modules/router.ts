import type { RouteRecordRaw } from 'vue-router/auto';
import { defineStore } from 'pinia';
import { transformRouteToMenu, type Menu } from '../helper/router-helper';
import { getMenuList } from '@/api/menu';
// import { setupLayouts } from 'virtual:generated-layouts';
// import { router } from '@/router';
// import { routes } from 'vue-router/auto/routes';

export interface RouterState {
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // 菜单列表
  menuList: Menu[];
  // 缓存路由页面
  cacheRoutes: string[];
}

export const useRouterStore = defineStore('router-store', {
  state: (): RouterState => ({
    isDynamicAddedRoute: false,
    menuList: [],
    cacheRoutes: [],
  }),
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
    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      // console.log('buildRoutesAction');
      // 获取后台路由
      const menuList = await getMenuList();
      // menuList.forEach((route: any) => {
      //   console.log(routes);
      //   if (1) {
      //   }
      // router.addRoute(route);
      // 判断后台返回的路由对象是否在文件路由中存在
      // const isExist = routes.find((item) => item.path === route.path);
      // if (isExist) {
      //   // 如果存在，则更新路由对象
      //   Object.assign(isExist, route);
      //   console.log('isExist', isExist);
      // }
      // });
      // 转换为菜单列表
      this.menuList = transformRouteToMenu(menuList);
      return [];
    },
  },
});

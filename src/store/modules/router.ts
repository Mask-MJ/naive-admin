import type { RouteRecordRaw } from 'vue-router/auto';
import { defineStore } from 'pinia';
import { transformRouteToMenu, type Menu } from '../helper/router-helper';
// import type { Menu } from '@/router/types';
// import { getMenuList } from '@/api/user';

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
      const router = useRouter();
      // 获取后台路由
      // const routeList = await getMenuList();
      // TODO: 暂时使用本地路由
      const routeList = router.getRoutes().filter((router) => router.path !== '/login');

      // 转换为菜单列表
      this.menuList = transformRouteToMenu(routeList);

      return [];
    },
  },
});

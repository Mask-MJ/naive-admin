import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { camelCase, upperFirst } from 'lodash-es';
import { defineStore } from 'pinia';

import { router } from '@/router';
import { useRouterPush } from '@/router/hooks';
import { PageEnum } from '@/settings';

import {
  clearTabRoutes,
  getIndexInTabRoutes,
  getIndexInTabRoutesByRouteName,
  getTabRouteByVueRoute,
  getTabRoutes,
  isInTabRoutes,
} from '../helper/tab-helper';

/** 多页签Tab的路由 */
export interface GlobalTabRoute
  extends Pick<import('vue-router').RouteLocationNormalizedLoaded, 'name' | 'fullPath' | 'meta'> {
  /** 滚动的位置 */
  scrollPosition: {
    left: number;
    top: number;
  };
}

interface TabState {
  /** 多页签数据 */
  tabs: GlobalTabRoute[];
  /** 多页签首页 */
  homeTab: GlobalTabRoute;
  /** 当前激活状态的页签(路由fullPath) */
  activeTab: string;
}

export const useMultipleTabStore = defineStore('tab-store', {
  state: (): TabState => ({
    tabs: [],
    homeTab: {} as GlobalTabRoute,
    activeTab: '',
  }),
  getters: {
    /** 当前激活状态的页签索引 */
    activeTabIndex(state) {
      return state.tabs.findIndex((tab) => tab.fullPath === state.activeTab);
    },
    getNoCacheList(state): string[] {
      return state.tabs
        .filter((tab) => tab.meta.noCache)
        .map((tab) => upperFirst(camelCase(tab.name as string)));
    },
  },
  actions: {
    /** 重置Tab状态 */
    resetTabStore() {
      clearTabRoutes();
      this.$reset();
    },
    /**
     * 设置当前路由对应的页签为激活状态
     * @param fullPath - 路由fullPath
     */
    setActiveTab(fullPath: string) {
      this.activeTab = fullPath;
    },
    /**
     * 设置当前路由对应的页签title
     * @param title - tab名称
     */
    setActiveTabTitle(title: string) {
      const item = this.tabs.find((tab) => tab.fullPath === this.activeTab);
      if (item) item.meta.title = title;
    },
    initHomeTab() {
      const routes = router.getRoutes();
      const findHome = routes.find((item) => item.path === PageEnum.BASE_HOME);
      if (findHome && !findHome.children.length) {
        // 有子路由的不能作为Tab
        this.homeTab = getTabRouteByVueRoute(findHome);
      }
    },
    /**
     * 添加多页签
     * @param route - 路由
     */
    addTab(route: RouteLocationNormalizedLoaded) {
      const tab = getTabRouteByVueRoute(route);

      if (isInTabRoutes(this.tabs, tab.fullPath)) return;

      const index = getIndexInTabRoutesByRouteName(this.tabs, route.name as string);

      if (index === -1) {
        this.tabs.push(tab);
        return;
      }

      const { multiTab = false } = route.meta;
      if (!multiTab) {
        this.tabs.splice(index, 1, tab);
        return;
      }

      this.tabs.push(tab);
    },
    /**
     * 删除多页签
     * @param fullPath - 路由fullPath
     */
    async removeTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      const updateTabs = this.tabs.filter((tab) => tab.fullPath !== fullPath);
      if (!isActive) this.tabs = updateTabs;

      if (isActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        const navigationFailure = await routerPush(activePath);
        if (!navigationFailure) {
          this.tabs = updateTabs;
          this.setActiveTab(activePath);
        }
      }
    },
    /**
     * 清空多页签(多页签首页保留)
     * @param excludes - 保留的多页签path
     */
    async clearTab(excludes: string[] = []) {
      const { routerPush } = useRouterPush(false);

      const homePath = this.homeTab.fullPath;
      const remain = [homePath, ...excludes];
      const hasActive = remain.includes(this.activeTab);
      const updateTabs = this.tabs.filter((tab) => remain.includes(tab.fullPath));
      if (hasActive) this.tabs = updateTabs;
      if (!hasActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        const navigationFailure = await routerPush(activePath);
        if (!navigationFailure) {
          this.tabs = updateTabs;
          this.setActiveTab(activePath);
        }
      }
    },
    /**
     * 清除左边多页签
     * @param fullPath - 路由fullPath
     */
    clearLeftTab(fullPath: string) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        const excludes = this.tabs.slice(index).map((item) => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /**
     * 清除右边多页签
     * @param fullPath - 路由fullPath
     */
    clearRightTab(fullPath: string) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        const excludes = this.tabs.slice(0, index + 1).map((item) => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /** 清除所有多页签 */
    clearAllTab() {
      this.clearTab();
    },
    /**
     * 点击单个tab
     * @param fullPath - 路由fullPath
     */
    async handleClickTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      if (!isActive) {
        const navigationFailure = await routerPush(fullPath);
        if (!navigationFailure) this.setActiveTab(fullPath);
      }
    },
    /**
     * 记录tab滚动位置
     * @param fullPath - 路由fullPath
     * @param position - tab当前页的滚动位置
     */
    recordTabScrollPosition(fullPath: string, position: { left: number; top: number }) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) this.tabs[index].scrollPosition = position;
    },
    /**
     * 获取tab滚动位置
     * @param fullPath - 路由fullPath
     */
    getTabScrollPosition(fullPath: string) {
      const position = { left: 0, top: 0 };
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) Object.assign(position, this.tabs[index].scrollPosition);

      return position;
    },
    /** 初始化Tab状态 */
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      const theme = useThemeStore();

      const tabs: GlobalTabRoute[] = theme.tab.isCache ? getTabRoutes() : [];

      const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
      if (!hasHome && this.homeTab.name !== 'root') tabs.unshift(this.homeTab);

      const isHome = currentRoute.fullPath === this.homeTab.fullPath;
      const index = getIndexInTabRoutesByRouteName(tabs, currentRoute.name as string);
      if (!isHome) {
        const currentTab = getTabRouteByVueRoute(currentRoute);
        if (!currentRoute.meta.multiTab) {
          if (index > -1) tabs.splice(index, 1, currentTab);
          else tabs.push(currentTab);
        } else {
          const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
          if (!hasCurrent) tabs.push(currentTab);
        }
      }

      this.tabs = tabs;
      this.setActiveTab(currentRoute.fullPath);
    },
  },
});

import type { VNodeChild } from 'vue';
import type { RouteRecordRaw, RouteMeta } from 'vue-router/auto';

export interface Menu {
  key: string;
  label: string | (() => VNodeChild);
  orderNo?: number;
  icon: () => VNodeChild;
  meta?: Partial<RouteMeta>;
  show: boolean;
  children?: Menu[];
}

export function transformRouteToMenu(routeList: RouteRecordRaw[]): Menu[] {
  return routeList
    .filter((route) => route.meta?.show !== false)
    .map((route) => {
      const menu: Menu = {
        key: route.path,
        label: route.meta?.title || '',
        icon: () => h('i', { class: route.meta?.icon }),
        show: !route.meta?.hidden,
      };
      if (route.children && route.children.length > 0) {
        menu.children = transformRouteToMenu(route.children);
      }
      return menu;
    });
}

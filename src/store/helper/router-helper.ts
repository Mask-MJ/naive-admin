import type { VNodeChild } from 'vue';
import type { RouteMeta, RouteRecordRaw } from 'vue-router/auto';

import { RouterLink } from 'vue-router/auto';
import { flatMapDeep } from 'lodash-es';

export interface Menu {
  key: string;
  label: string | (() => VNodeChild);
  orderNo?: number;
  icon: () => VNodeChild;
  meta?: Partial<RouteMeta>;
  show: boolean;
  children?: Menu[];
}

// 判断后台返回的路由对象是否在文件路由中存在
function getLabel(route: RouteRecordRaw) {
  // 获取拼接的 route.name 来和 真实文件路由列表对比
  if (route.children && route.children.length) {
    return route.meta!.title ?? route.name;
  } else if (route.meta!.link) {
    return () => h('a', { href: route.meta!.link, target: '_blank' }, route.meta!.title);
  } else {
    const path = route.path.toLocaleLowerCase();
    return () =>
      h(RouterLink, { to: { path: path } }, { default: () => route.meta!.title ?? route.name });
  }
}

export function transformRouteToMenu(routeList: RouteRecordRaw[]): Menu[] {
  return routeList
    .filter((route) => route.meta?.show !== false)
    .map((route) => {
      const menu: Menu = {
        key: route.path,
        label: getLabel(route),
        icon: () => h('i', { class: `i-${route.meta?.icon}` }),
        show: !route.meta?.hidden,
      };
      if (route.children && route.children.length > 0) {
        menu.children = transformRouteToMenu(route.children);
      }
      return menu;
    });
}

//扁平化路由
export function flatRoutes(routeList: RouteRecordRaw[]): RouteRecordRaw[] {
  return flatMapDeep(routeList, (route) => {
    return route.children && route.children.length ? route.children : route;
  });
}

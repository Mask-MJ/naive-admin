<script setup lang="ts">
  import { DropdownOption } from 'naive-ui';
  import { useRouterPush } from '@/router/hooks';
  import { RouteRecordRaw } from 'vue-router/auto';
  const route = useRoute();
  const theme = useThemeStore();
  const routerStore = useRouterStore();
  const { routerPush } = useRouterPush();

  function getTopLevelMenu(path: string, routes: RouteRecordRaw[]): RouteRecordRaw | undefined {
    return routes.find((item) => {
      if (item.path === path) return true;
      if (Array.isArray(item.children)) {
        return getTopLevelMenu(path, item.children);
      }
      return false;
    });
  }

  function generateBreadcrumbs(routes: RouteRecordRaw[]): DropdownOption[] {
    return routes.map((route) => {
      const list: DropdownOption = {
        label: route.meta!.title,
        key: route.path,
        icon: () => h('i', { class: `i-${route.meta!.icon}` }),
      };
      if (route.children && route.children.length > 0) {
        list.children = generateBreadcrumbs(route.children);
      }
      return list;
    });
  }

  const breadcrumbs = computed(() => {
    const topLevelMenu = getTopLevelMenu(route.path, routerStore.backendRouteList);
    // 获取当前路由菜单
    if (topLevelMenu && topLevelMenu.children) {
      topLevelMenu.children = topLevelMenu.children.filter((item) => !item.meta?.hidden);
      const currentRoute = topLevelMenu.children.find((item) => item.path === route.path);
      return generateBreadcrumbs([topLevelMenu, currentRoute!]);
    }
    return generateBreadcrumbs([topLevelMenu!]);
  });

  function dropdownSelect(key: string) {
    routerPush({ path: key });
  }
</script>

<template>
  <n-breadcrumb class="px-12px">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-breadcrumb-item>
        <n-dropdown
          v-if="breadcrumb.children && breadcrumb.children.length > 0"
          :options="breadcrumb.children"
          @select="dropdownSelect"
        >
          <span>
            <component
              :is="breadcrumb.icon"
              v-if="theme.header.crumb.showIcon"
              :class="{ 'text-#BBBBBB': theme.header.inverted }"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
              {{ breadcrumb.label }}
            </span>
          </span>
        </n-dropdown>
        <template v-else>
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
            {{ breadcrumb.label }}
          </span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
  <div></div>
</template>

<style scoped></style>

<script setup lang="ts">
  // import { routePath } from '@/router';
  // import { useRouterPush } from '@/composables';
  // import { getBreadcrumbByRouteKey } from '@/utils';

  // defineOptions({ name: 'GlobalBreadcrumb' });

  // const { t } = useI18n();
  // const route = useRoute();
  // const theme = useThemeStore();
  // const routerStore = useRouterStore();
  // const { routerPush } = useRouterPush();

  // const breadcrumbs = computed(() =>
  //   getBreadcrumbByRouteKey(
  //     route.name as string,
  //     routerStore.menus as App.GlobalMenuOption[],
  //     routePath('root'),
  //   ).map((item) => ({
  //     ...item,
  //     label: item.i18nTitle ? t(item.i18nTitle) : item.label,
  //     options: item.options?.map((oItem) => ({
  //       ...oItem,
  //       label: oItem.i18nTitle ? t(oItem.i18nTitle) : oItem.label,
  //     })),
  //   })),
  // );

  // function dropdownSelect(key: string) {
  //   routerPush({ name: key });
  // }
</script>

<template>
  <!-- <n-breadcrumb class="px-12px">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-breadcrumb-item>
        <n-dropdown
          v-if="breadcrumb.hasChildren"
          :options="breadcrumb.options"
          @select="dropdownSelect"
        >
          <span>
            <component
              :is="breadcrumb.icon"
              v-if="theme.header.crumb.showIcon"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span>{{ breadcrumb.label }}</span>
          </span>
        </n-dropdown>
        <template v-else>
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon"
            class="inline-block align-text-bottom mr-4px text-16px"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
            {{ breadcrumb.label }}
          </span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb> -->
  <div></div>
</template>

<style scoped></style>

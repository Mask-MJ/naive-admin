<script setup lang="ts">
  import { dateZhCN, zhCN } from 'naive-ui';
  import { subscribeThemeStore } from '@/settings';
  import { getAppEnvConfig } from '@/utils';

  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  useHead({ title: VITE_GLOB_APP_TITLE });

  const theme = useThemeStore();

  subscribeThemeStore();
</script>

<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>

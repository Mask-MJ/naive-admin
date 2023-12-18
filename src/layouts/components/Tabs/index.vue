<script setup lang="ts" name="LayoutTab">
  import ReloadButton from './components/ReloadButton.vue';
  import TabDetail from './components/TabDetail.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const themeStore = useThemeStore();
  const tabStore = useMultipleTabStore();

  tabStore.iniTabStore(route);

  watch(
    () => route.fullPath,
    () => {
      tabStore.addTab(route);
      tabStore.setActiveTab(route.fullPath);
    },
  );
</script>

<template>
  <DarkModeContainer
    class="global-tab flex-y-center w-full pl-16px"
    :style="{ height: `${themeStore.tab.height}px` }"
  >
    <div class="flex-1 overflow-hidden h-full">
      <TabDetail />
    </div>
    <ReloadButton />
  </DarkModeContainer>
</template>

<style scoped>
  .global-tab {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  }
</style>

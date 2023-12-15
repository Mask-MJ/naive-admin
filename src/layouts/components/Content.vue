<script setup lang="ts">
  defineProps({ showPadding: { type: Boolean, default: true } });

  const app = useAppStore();
  const themeStore = useThemeStore();
  const tabStore = useMultipleTabStore();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="themeStore.pageAnimateMode" mode="out-in" appear>
      <keep-alive :exclude="tabStore.getNoCacheList">
        <component :is="Component" v-if="app.reloadFlag" :key="route.name" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>

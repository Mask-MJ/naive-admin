<script setup lang="ts" name="SettingButton">
  const { t } = useI18n();
  const app = useAppStore();
  const theme = useThemeStore();
</script>

<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="t('header.themeConfig')"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible()"
  >
    <i class="text-20px i-ant-design:setting-outlined" />
  </hover-container>
</template>

<style scoped></style>

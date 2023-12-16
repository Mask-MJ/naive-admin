<script lang="ts" setup name="ThemeMode">
  const { t } = useI18n();
  const theme = useThemeStore();

  const tooltipContent = computed(() => {
    return theme.darkMode ? t('header.themeLight') : t('header.themeDark');
  });
  function changeDark() {
    theme.setDarkMode(!theme.darkMode);
  }
</script>

<template>
  <hover-container
    class="w-40px"
    :inverted="theme.header.inverted"
    :tooltip-content="tooltipContent"
  >
    <dark-mode-switch :dark="theme.darkMode" class="wh-full" @update:dark="changeDark" />
  </hover-container>
</template>

<style scoped></style>

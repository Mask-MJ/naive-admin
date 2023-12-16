<script lang="ts" setup name="FullScreen">
  const { t } = useI18n();
  const { isFullscreen, toggle } = useFullscreen();
  const theme = useThemeStore();

  const tooltipContent = computed(() => {
    return isFullscreen.value ? t('header.tooltipExitFull') : t('header.tooltipEntryFull');
  });
</script>

<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="tooltipContent"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <i v-if="isFullscreen" class="text-18px i-ant-design:fullscreen-exit-outlined" />
    <i v-else class="text-18px i-ant-design:fullscreen-outlined" />
  </hover-container>
</template>

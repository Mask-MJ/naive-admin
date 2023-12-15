<script setup lang="ts" name="LayoutLogo">
  import { PageEnum } from '@/settings';

  defineProps({ showTitle: { type: Boolean, default: true } });
  const { t } = useI18n();
</script>

<template>
  <router-link
    :to="PageEnum.BASE_HOME"
    class="flex-center w-full whitespace-nowrap overflow-hidden"
  >
    <n-image width="40" src="/vite.svg" />
    <h2
      v-show="showTitle"
      class="pl-8px text-20px font-bold text-primary transition duration-300 ease-in-out"
    >
      {{ t('app.name') }}
    </h2>
  </router-link>
</template>

<style scoped></style>

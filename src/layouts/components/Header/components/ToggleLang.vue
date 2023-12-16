<script lang="ts" setup>
  import { LANGUAGE__KEY } from '@/settings';
  const theme = useThemeStore();
  const { locale } = useI18n();
  const language = useStorage(LANGUAGE__KEY, 'zh-CN');

  const options = [
    { label: '中文', key: 'zh-CN' },
    { label: 'English', key: 'en' },
  ];

  const handleSelect = (key: string) => {
    language.value = key;
    locale.value = key;
  };
</script>

<template>
  <hover-container class="w-40px h-full" :inverted="theme.header.inverted">
    <n-dropdown :options="options" trigger="hover" :value="language" @select="handleSelect">
      <div class="wh-full flex-center">
        <svg
          class="text-18px outline-transparent"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M320 24H16v304h176v168h304V192H320ZM148.305 96L98.093 239.3H132l8.166-23.3H192v80H48V56h240v136h-66.668L187.7 96Zm36.317 88h-33.244L168 136.562ZM464 224v240H224V224Z"
          />
          <path
            fill="currentColor"
            d="M317.432 368.48a136.761 136.761 0 0 0 10.089 14.12q-17.4 9.384-39.521 9.4v32c24.141 0 45.71-6.408 64-18.824C370.29 417.592 391.859 424 416 424v-32q-22.075 0-39.52-9.407a136.574 136.574 0 0 0 10.088-14.113A166.212 166.212 0 0 0 406.662 320H424v-32h-56v-24h-32v24h-56v32h17.338a166.212 166.212 0 0 0 20.094 48.48M373.53 320a133.013 133.013 0 0 1-14.1 31.52a104.39 104.39 0 0 1-7.43 10.448a103.546 103.546 0 0 1-6.93-9.651A132.384 132.384 0 0 1 330.466 320Z"
          />
        </svg>
      </div>
    </n-dropdown>
  </hover-container>
</template>
<style scoped></style>

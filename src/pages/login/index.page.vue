<script setup lang="ts">
  import loginForm from './loginForm.vue';
  import { computed } from 'vue';

  import { getAppEnvConfig, getColorPalette, mixinColor } from '@/utils';

  const theme = useThemeStore();
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();

  const bgThemeColor = computed(() =>
    theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor,
  );

  const bgColor = computed(() => {
    const COLOR_WHITE = '#ffffff';
    const ratio = theme.darkMode ? 0.5 : 0.2;
    return mixinColor(COLOR_WHITE, theme.themeColor, ratio);
  });

  const lightColor = computed(() => getColorPalette(bgThemeColor.value, 3));
  const darkColor = computed(() => getColorPalette(bgThemeColor.value, 6));
</script>

<template>
  <div class="relative flex-center wh-full" :style="{ backgroundColor: bgColor }">
    <dark-mode-switch
      :dark="theme.darkMode"
      class="absolute left-48px top-24px z-3 text-20px"
      @update:dark="theme.setDarkMode"
    />
    <n-card :bordered="false" size="large" class="z-4 !w-auto rounded-20px shadow-sm">
      <div class="w-300px sm:w-360px">
        <header class="flex-y-center justify-between">
          <system-logo class="text-64px text-primary" />
          <n-gradient-text type="primary" :size="28">{{ VITE_GLOB_APP_TITLE }}</n-gradient-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">用户登录</h3>
          <div class="pt-24px">
            <loginForm />
          </div>
        </main>
      </div>
    </n-card>
    <div class="absolute left-0 top-0 z-1 wh-full overflow-hidden">
      <div class="absolute -right-300px -top-900px <sm:(-right-100px -top-1170px)">
        <svg height="1337" width="1337">
          <defs>
            <path
              id="path-1"
              opacity="1"
              fill-rule="evenodd"
              d="M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
            />
            <linearGradient id="linearGradient-2" x1="0.79" y1="0.62" x2="0.21" y2="0.86">
              <stop offset="0" :stop-color="lightColor" stop-opacity="1" />
              <stop offset="1" :stop-color="darkColor" stop-opacity="1" />
            </linearGradient>
          </defs>
          <g opacity="1">
            <use xlink:href="#path-1" fill="url(#linearGradient-2)" fill-opacity="1" />
          </g>
        </svg>
      </div>
      <div class="absolute -left-200px -bottom-400px <sm:(-left-100px -bottom-760px)">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          height="896"
          width="967.8852157128662"
        >
          <defs>
            <path
              id="path-2"
              opacity="1"
              fill-rule="evenodd"
              d="M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896 C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806 200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
            />
            <linearGradient id="linearGradient-3" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0" :stop-color="darkColor" stop-opacity="1" />
              <stop offset="1" :stop-color="lightColor" stop-opacity="1" />
            </linearGradient>
          </defs>
          <g opacity="1">
            <use xlink:href="#path-2" fill="url(#linearGradient-3)" fill-opacity="1" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

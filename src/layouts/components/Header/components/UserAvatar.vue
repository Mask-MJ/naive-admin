<script lang="ts" setup name="UserAvatar">
  import type { DropdownOption } from 'naive-ui';

  const { t } = useI18n();
  const user = useUserStore();
  const theme = useThemeStore();
  const options: DropdownOption[] = [
    {
      label: '用户中心',
      key: 'user-center',
      icon: () => h('i', { class: 'i-carbon:user' }),
    },
    {
      type: 'divider',
      key: 'divider',
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: () => h('i', { class: 'i-carbon:logout' }),
    },
  ];

  type DropdownKey = 'user-center' | 'logout';

  function handleDropdown(optionKey: string) {
    const key = optionKey as DropdownKey;
    if (key === 'logout') {
      window.$dialog?.info({
        title: t('app.logoutTip'),
        content: t('app.logoutMessage'),
        positiveText: t('components.modal.positiveText'),
        negativeText: t('components.modal.negativeText'),
        onPositiveClick: () => user.logout(),
      });
    }
  }
</script>

<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <n-avatar round size="small" :src="user.userInfo.avatar" />
      <span class="pl-8px text-16px font-medium"> {{ user.userInfo.nickname }} </span>
    </hover-container>
  </n-dropdown>
</template>

<style scoped></style>

<script setup lang="ts" name="ContextMenu">
  import type { DropdownOption } from 'naive-ui';

  const props = defineProps({
    visible: { type: Boolean, default: false },
    currentPath: { type: String, default: '' },
    affix: { type: Boolean, default: false },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  });

  const emit = defineEmits(['update:visible']);

  const app = useAppStore();
  const tab = useMultipleTabStore();

  const dropdownVisible = computed({
    get() {
      return props.visible;
    },
    set(visible: boolean) {
      emit('update:visible', visible);
    },
  });

  function hide() {
    dropdownVisible.value = false;
  }

  type DropdownKey =
    | 'reload-current'
    | 'close-current'
    | 'close-other'
    | 'close-left'
    | 'close-right'
    | 'close-all';
  type Option = DropdownOption & {
    key: DropdownKey;
  };

  const options = computed<Option[]>(() => [
    {
      label: '重新加载',
      key: 'reload-current',
      disabled: props.currentPath !== tab.activeTab,
      icon: () => h('i', { class: 'i-carbon:renew' }),
    },
    {
      label: '关闭',
      key: 'close-current',
      disabled: props.currentPath === tab.homeTab.fullPath || Boolean(props.affix),
      icon: () => h('i', { class: 'i-carbon:close' }),
    },
    {
      label: '关闭其他',
      key: 'close-other',
      icon: () => h('i', { class: 'i-carbon:column-delete' }),
    },
    {
      label: '关闭左侧',
      key: 'close-left',
      icon: () => h('i', { class: 'i-carbon:arrow-left' }),
    },
    {
      label: '关闭右侧',
      key: 'close-right',
      icon: () => h('i', { class: 'i-carbon:arrow-right' }),
    },
    {
      label: '关闭所有',
      key: 'close-all',
      icon: () => h('i', { class: 'i-carbon:closed-caption' }),
    },
  ]);

  const actionMap = new Map<DropdownKey, () => void>([
    [
      'reload-current',
      () => {
        app.reloadPage();
      },
    ],
    [
      'close-current',
      () => {
        tab.removeTab(props.currentPath);
      },
    ],
    [
      'close-other',
      () => {
        tab.clearTab([props.currentPath]);
      },
    ],
    [
      'close-left',
      () => {
        tab.clearLeftTab(props.currentPath);
      },
    ],
    [
      'close-right',
      () => {
        tab.clearRightTab(props.currentPath);
      },
    ],
    [
      'close-all',
      () => {
        tab.clearAllTab();
      },
    ],
  ]);

  function handleDropdown(optionKey: string) {
    const key = optionKey as DropdownKey;
    const actionFunc = actionMap.get(key);
    if (actionFunc) actionFunc();

    hide();
  }
</script>

<template>
  <n-dropdown
    :show="dropdownVisible"
    :options="options"
    placement="bottom-start"
    :x="x"
    :y="y"
    @clickoutside="hide"
    @select="handleDropdown"
  />
</template>

<style scoped></style>

<script setup lang="ts" name="ButtonTab">
  import IconClose from './IconClose.vue';
  import { computed } from 'vue';
  import { CssRender } from 'css-render';

  import useBoolean from '@/hooks/useBoolean';
  import { addColorAlpha } from '@/utils/color';

  const props = defineProps({
    darkMode: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    primaryColor: { type: String, default: '#1890ff' },
    borderColor: { type: String, default: '#e5e7eb' },
    darkBorderColor: { type: String, default: '#ffffff3d' },
    closable: { type: Boolean, default: true },
  });

  const emit = defineEmits(['close']);

  const { bool: isHover, setTrue, setFalse } = useBoolean();

  const isIconActive = computed(() => props.isActive || isHover.value);

  const buttonStyle = computed(() => {
    const style: Record<string, string> = {};
    style.borderColor = props.darkMode ? props.darkBorderColor : props.borderColor;
    if (isIconActive.value) {
      style.color = props.primaryColor;
      style.borderColor = addColorAlpha(props.primaryColor, 0.3);
      if (props.isActive) {
        const alpha = props.darkMode ? 0.15 : 0.1;
        style.backgroundColor = addColorAlpha(props.primaryColor, alpha);
      }
    }
    return style;
  });

  function handleClose(e: MouseEvent) {
    e.stopPropagation();
    emit('close');
  }

  const { c } = CssRender();
  const style = c(
    '.admin-tab__button-tab',
    {
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '30px',
      paddingLeft: '14px',
      paddingRight: '6px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '2px',
      cursor: 'pointer',
    },
    [
      c('&--unclosable', { paddingRight: '14px !important' }),
      c('&__preffix', { whiteSpace: 'nowrap' }),
      c('&__icon', { paddingLeft: '10px' }),
    ],
  );
  style.render();
  style.mount();
</script>

<template>
  <div
    class="admin-tab__button-tab"
    :class="{ 'admin-tab__button-tab--unclosable': !closable }"
    :style="buttonStyle"
    @mouseenter="setTrue"
    @mouseleave="setFalse"
  >
    <span class="admin-tab__button-tab__preffix">
      <slot />
    </span>
    <div v-if="closable" class="admin-tab__button-tab__icon">
      <IconClose :is-active="isIconActive" :active-color="primaryColor" @click="handleClose" />
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  const props = defineProps({
    dark: { type: Boolean, default: false },
  });

  const emit = defineEmits(['update:dark']);

  const darkMode = computed<boolean>({
    get() {
      return props.dark;
    },
    set(newValue) {
      emit('update:dark', newValue);
    },
  });

  function handleSwitch() {
    darkMode.value = !darkMode.value;
  }
</script>

<template>
  <div class="flex-center text-18px cursor-pointer" @click="handleSwitch">
    <i v-if="darkMode" class="i-line-md:moon" />
    <i v-else class="i-line-md:sunny-outline" />
  </div>
</template>

<style scoped></style>

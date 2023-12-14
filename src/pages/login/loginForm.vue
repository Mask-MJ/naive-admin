<script setup lang="ts">
  import type { FormInst, FormRules } from 'naive-ui';

  const { login } = useUserStore();

  const formRef = ref<HTMLElement & FormInst>();
  const model = ref({ username: 'mask', password: '123456' });
  const rules: FormRules = {
    password: {
      required: true,
      message: '密码需要大于6位',
      trigger: 'input',
    },
  };
  const loading = ref(false);

  const rememberMe = ref(false);

  async function handleSubmit() {
    loading.value = true;
    await formRef.value?.validate();
    login(model.value);
    loading.value = false;
  }
</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="username">
      <n-input v-model:value="model.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        placeholder="请输入密码"
      />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="loading"
        @click="handleSubmit"
      >
        确定
      </n-button>
    </n-space>
  </n-form>
</template>

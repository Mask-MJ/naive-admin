<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import { useModalInner } from '@/components/Modal';
  import { createUser, getUserDetail, updateUser } from '@/api/system/user';
  import { UserInfo } from '@/api/system/user.type';

  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 100,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data: UserInfo) => {
    setModalProps({ title: data.id ? '编辑账号' : '新增账号' });
    if (data.id) {
      const result = await getUserDetail(data.id);
      setPathsValue(result);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      result.id ? await updateUser(result) : await createUser(result);
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal class="!w-200" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>

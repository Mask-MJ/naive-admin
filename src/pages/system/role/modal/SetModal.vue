<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import { useModalInner } from '@/components/Modal';
  import { createRole, getRoleDetail, updateRole } from '@/api/system/role';
  import { Roles } from '@/api/system/role.type';

  import { setSchemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const id = ref();
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas: setSchemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data: Roles) => {
    setModalProps({ title: data.id ? '修改角色' : '新增角色' });
    if (data.id) {
      id.value = data.id;
      const result = await getRoleDetail(data.id);
      await setPathsValue(result);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      result.id ? await updateRole(result) : await createRole(result);
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<template>
  <Modal @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>

<script setup lang="ts">
  import type { UserInfo } from '@/api/system/user.type';

  import ResetModal from './modal/ResetModal.vue';
  import SetModal from './modal/SetModal.vue';

  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { deleteUser, getUsersList } from '@/api/system/user';

  import { columns, schemas } from './data';

  const searchInfo = reactive<Recordable>({});

  const router = useRouter();
  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerResetModal, { openModal: openResetModel }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getUsersList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    searchInfo,
    bordered: true,
    rowKey: (rowData) => rowData.id,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: UserInfo) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openSetModel(true, { id: row.id }),
            },
            {
              icon: 'i-ant-design:user-add-outlined',
              tooltipProps: { content: '分配角色' },
              buttonProps: {
                type: 'warning',
                onClick: () => {
                  router.push(`/system/distribution/${row.id}`);
                },
              },
            },
            {
              icon: 'i-ant-design:key-outlined',
              tooltipProps: { content: '重置密码' },
              buttonProps: {
                type: 'success',
                onClick: () => {
                  openResetModel(true, { id: row.id });
                },
              },
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteUser(row.id);
                await reload();
              },
            },
          ],
        }),
    },
  });

  const handleAdd = () => {
    openSetModel(true);
  };
</script>

<template>
  <div class="flex h-full">
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
      </template>
    </Table>
    <SetModal @register="registerSetModal" @success="reload()" />
    <ResetModal @register="registerResetModal" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import type { Roles } from '@/api/system/role.type';

  import SetModal from './modal/SetModal.vue';

  import { useModal } from '@/components/Modal';
  import { Action, useTable } from '@/components/Table';
  import { deleteRole, getRoleList } from '@/api/system/role';

  import { columns, schemas } from './data';

  const [registerSetModal, { openModal: openSetModel }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getRoleList,
    columns,
    useSearchForm: true,
    formConfig: { labelWidth: 100, schemas },
    rowKey: (rowData: Roles) => rowData.id,
    actionColumn: {
      width: 200,
      key: 'ACTION',
      render: (row: Roles) =>
        h(Action, {
          actions: [
            {
              type: 'edit',
              onClick: () => openSetModel(true, { id: row.id }),
            },
            {
              type: 'del',
              onClick: async () => {
                await deleteRole(row.id);
                await reload();
              },
            },
          ],
        }),
    },
  });
</script>

<template>
  <div class="flex h-full">
    <Table @register="registerTable">
      <template #toolbar>
        <n-button type="primary" @click="openSetModel(true)">新增</n-button>
      </template>
    </Table>
    <SetModal @register="registerSetModal" @success="reload()" />
  </div>
</template>

<style scoped></style>

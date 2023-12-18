import type { Roles } from '@/api/system/role.type';
import type { FormSchema } from '@/components/Form/types';
import type { BasicColumn } from '@/components/Table';

import { NPopconfirm, NSwitch } from 'naive-ui';

import { changeStatus } from '@/api/system/role';

export const columns: BasicColumn<Roles & { pendingStatus: boolean }>[] = [
  {
    title: '角色名称',
    key: 'name',
    width: 200,
  },
  {
    title: '角色编号',
    key: 'id',
    width: 100,
  },
  {
    title: '权限字符',
    key: 'key',
    width: 200,
  },
  {
    title: '显示顺序',
    key: 'sort',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            const status = rowData.status ? 0 : 1;
            changeStatus({ id: rowData.id, status })
              .then(() => {
                rowData.status = status;
                window.$message.success(`已成功修改用户状态`);
              })
              .catch(() => {
                window.$message.error('修改用户状态失败');
              })
              .finally(() => {
                rowData.pendingStatus = false;
              });
          },
          onNegativeClick() {
            rowData.pendingStatus = false;
          },
        },
        {
          default: () => (rowData.status ? '是否停用用户' : '是否启用用户'),
          trigger: () =>
            h(
              NSwitch,
              {
                checkedValue: 1,
                uncheckedValue: 0,
                loading: rowData.pendingStatus,
                value: rowData.status,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '启用', unchecked: () => '停用' },
            ),
        },
      ),
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'roleName',
    component: 'NInput',
    label: '角色名称',
    span: 8,
    componentProps: { placeholder: '输入角色名称' },
  },
  {
    path: 'roleKey',
    component: 'NInput',
    label: '权限字符',
    span: 8,
    componentProps: { placeholder: '输入权限字符' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 8,
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
  },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
];

import type { FormSchema } from '@/components/Form';

export const setSchemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  {
    path: 'name',
    component: 'NInput',
    required: true,
    label: '角色名称',
    defaultValue: '',
    componentProps: { placeholder: '请输入角色名称' },
  },
  {
    path: 'key',
    component: 'NInput',
    required: true,
    label: '权限字符',
    defaultValue: '',
    componentProps: { placeholder: '请输入权限字符' },
  },
  {
    path: 'sort',
    component: 'NInputNumber',
    label: '显示顺序',
    required: true,
    defaultValue: 0,
    componentProps: { placeholder: '显示顺序' },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },

  {
    path: 'remark',
    component: 'NInput',
    label: '备注',
    defaultValue: '',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];

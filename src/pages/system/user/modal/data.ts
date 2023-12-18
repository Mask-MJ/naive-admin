import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  {
    path: 'username',
    label: '用户名称',
    required: true,
    component: 'NInput',
    componentProps: { disabled: true },
    span: 12,
  },
  {
    path: 'nickname',
    label: '用户昵称',
    component: 'NInput',
    span: 12,
  },
  {
    path: 'password',
    label: '用户密码',
    required: true,
    component: 'NInput',
    ifShow: ({ model }) => !Boolean(model.id),
    span: 12,
  },
  {
    path: 'phonenumber',
    label: '手机号码',
    component: 'NInput',
    rule: [
      {
        required: true,
        validator: (_rule, value) => {
          const regExp = new RegExp('^[1][3,4,5,7,8,9][0-9]{9}$');
          return regExp.test(value) ? Promise.resolve() : Promise.reject('手机号格式不正确');
        },
        trigger: 'change',
      },
    ],
  },
  {
    path: 'email',
    label: '邮箱',
    component: 'NInput',
    span: 12,
    required: true,
    rule: [
      {
        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: '邮箱格式不正确',
      },
      { max: 50, message: '邮箱不得超过50字符' },
    ],
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    defaultValue: 1,
    span: 12,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },

  {
    path: 'role',
    label: '角色',
    component: 'NSelect',
    span: 24,
    componentProps: {
      labelField: 'roleName',
      valueField: 'roleId',
    },
  },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
    span: 24,
  },
];

export const resetSchemas: FormSchema[] = [
  {
    path: 'userId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'password',
    label: '新密码',
    component: 'NInput',
    rule: [
      {
        required: true,
        trigger: 'change',
        validator: (_rule, value) =>
          new RegExp(/^.{5,20}$/).test(value)
            ? Promise.resolve()
            : Promise.reject('用户密码长度必须介于 5 和 20 之间'),
      },
    ],
  },
];

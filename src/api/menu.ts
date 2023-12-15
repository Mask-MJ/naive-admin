// import { defHttp } from '@/utils';
import { RouteRecordRaw } from 'vue-router/auto';

export interface MenuSearchParams {
  menuName?: string;
  status?: string;
}

// enum Api {
//   Menu = '/system/menu/',
// }

export const getMenuList = async (): Promise<RouteRecordRaw[]> => {
  return [
    {
      name: 'Dashboard',
      path: '/dashboard',
      redirect: '',
      meta: { title: '仪表台', icon: 'ant-design:appstore-outlined' },
    },
    {
      name: 'System',
      path: '/system',
      meta: { title: '系统管理', icon: 'ant-design:setting-outlined' },
      redirect: '',
      children: [
        {
          name: 'User',
          path: '/system/user',
          meta: { title: '用户管理', icon: 'ant-design:user-outlined' },
          redirect: '',
        },
        {
          name: 'Role',
          path: '/system/role',
          meta: { title: '角色管理', icon: 'ant-design:usergroup-add-outlined' },
          redirect: '',
        },
        {
          name: 'Menu',
          path: '/system/menu',
          meta: { title: '菜单管理', icon: 'ant-design:menu-outlined' },
          redirect: '',
        },
      ],
    },
  ];
};

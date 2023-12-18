import { defHttp } from '@/utils';

enum Api {
  TreeSelect = '/system/depts',
}

// 获取部门关系树
export const getDeptList = () => defHttp.get({ url: Api.TreeSelect });

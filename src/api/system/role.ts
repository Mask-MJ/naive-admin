import type { ChangeStatusParams, Roles, RolesParams } from './role.type';

import { defHttp } from '@/utils';

enum Api {
  Roles = 'system/roles',
  Status = 'system/roles/status',
}

// 获取角色列表
export const getRoleList = (params: Partial<RolesParams>) =>
  defHttp.get<Roles[]>({ url: Api.Roles, params });
// 创建角色
export const createRole = (params: RolesParams) => defHttp.post({ url: Api.Roles, params });
// 获取角色详情
export const getRoleDetail = (id: number) => defHttp.get<Roles>({ url: `${Api.Roles}/${id}` });
// 更新角色
export const updateRole = (params: Roles) =>
  defHttp.patch({ url: `${Api.Roles}/${params.id}`, params });
// 删除角色
export const deleteRole = (ids: number | string) => defHttp.delete({ url: `${Api.Roles}/${ids}` });
// 修改角色状态
export const changeStatus = (params: ChangeStatusParams) =>
  defHttp.put({ url: Api.Status, params });

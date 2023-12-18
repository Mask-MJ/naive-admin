import type {
  ChangeStatusParams,
  LoginParams,
  LoginResult,
  RegisterParams,
  ResetPasswordParams,
  UserInfo,
} from './user.type';

import { defHttp } from '@/utils';

enum Api {
  Register = 'authentication/sign-up',
  Login = 'authentication/sign-in',

  Users = 'system/users',
  UserInfo = 'system/users/info',
  Logout = 'system/users/logout',
  Status = 'system/users/status',
  ResetPassword = 'system/users/password',
}

// 注册
export const register = (params: RegisterParams) => defHttp.post({ url: Api.Register, params });
// 登录
export const login = (params: LoginParams) => defHttp.post<LoginResult>({ url: Api.Login, params });
// 退出
export const doLogout = () => defHttp.post({ url: Api.Logout });
// 获取自身用户信息
export const getUserInfo = () => defHttp.get<UserInfo>({ url: Api.UserInfo });

// 获取用户列表
export const getUsersList = () => defHttp.get<UserInfo[]>({ url: Api.Users });
// 创建用户
export const createUser = (params: RegisterParams) => defHttp.post({ url: Api.Users, params });
// 获取单个用户信息
export const getUserDetail = (id: number) => defHttp.get<UserInfo>({ url: `${Api.Users}/${id}` });
// 更新用户
export const updateUser = (params: UserInfo) =>
  defHttp.patch({ url: `${Api.Users}/${params.id}`, params });
// 删除用户
export const deleteUser = (ids: number | string) => defHttp.delete({ url: `${Api.Users}/${ids}` });
// 修改用户状态
export const changeStatus = (params: ChangeStatusParams) =>
  defHttp.put({ url: Api.Status, params });
// 修改密码
export const resetPassword = (params: ResetPasswordParams) =>
  defHttp.put({ url: Api.ResetPassword, params });

import { defHttp } from '@/utils';

export interface RegisterParams {
  username: string;
  password: string;
  nickname?: string;
  role?: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  username: string;
  role: string;
  nickname?: string;
  avatar?: string;
}

enum Api {
  Register = 'authentication/sign-up',
  Login = 'authentication/sign-in',
  Logout = 'authentication/logout',
  Users = 'users',
  UserInfo = 'users/info',
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
export const getUser = (id: number) => defHttp.get<UserInfo>({ url: `${Api.Users}/${id}` });
// 更新用户
export const updateUser = (params: UserInfo) =>
  defHttp.patch({ url: `${Api.Users}/${params.id}`, params });
// 删除用户
export const delUsers = (ids: number | string) => defHttp.delete({ url: `${Api.Users}/${ids}` });

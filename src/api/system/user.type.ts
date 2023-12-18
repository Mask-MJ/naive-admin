export interface RegisterParams {
  username: string;
  password: string;
  nickname?: string;
  roles?: string[];
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
  nickname?: string;
  avatar?: string;
  status?: number;
  roles: string[];
  permissions: string[];
  createTime: string;
  updateTime?: string;
}

export interface ChangeStatusParams {
  id: number;
  status: number;
}

export interface ResetPasswordParams {
  id: number;
  password: string;
}

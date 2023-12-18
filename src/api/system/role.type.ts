export interface Roles {
  id: number;
  name: string;
  key: string;
  sort: number;
  status: 0 | 1;
  createTime: string;
  updateTime?: string;
}

export interface RolesParams {
  name: string;
  key: string;
  sort: number;
  status: 0 | 1;
}

export interface ChangeStatusParams {
  id: number;
  status: number;
}

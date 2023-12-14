import { defineStore } from 'pinia';
import type { RemovableRef } from '@vueuse/core';
import { router } from '@/router';
import { TOKEN_KEY, USER_INFO_KEY } from '@/settings';
import { doLogout, getUserInfo, login, LoginParams, UserInfo } from '@/api/user';

interface UserState {
  userInfo: RemovableRef<UserInfo | null>;
  token: RemovableRef<string | null>;
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    // user info
    userInfo: useStorage(USER_INFO_KEY, null),
    // token
    token: useStorage(TOKEN_KEY, null),
  }),
  getters: {
    getToken(): string {
      return this.token || '';
    },
    getUserInfo(): UserInfo {
      return this.userInfo || ({} as UserInfo);
    },
  },
  actions: {
    setToken(info: string | null = null) {
      this.token = info;
    },
    setUserInfo(info: UserInfo | null = null) {
      this.userInfo = info;
    },
    // 登录, 获取token
    async login(params: LoginParams): Promise<UserInfo | null> {
      try {
        const data = await login(params);
        const { accessToken } = data;
        this.setToken(accessToken);
        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 登录后的操作, 获取用户信息
    async afterLoginAction(): Promise<UserInfo | null> {
      if (!this.token) return null;
      const userInfo = await this.getUserInfoAction();
      return userInfo;
    },
    // 获取用户信息
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const result = await getUserInfo();
      this.setUserInfo(result);
      return result;
    },
    async logout() {
      if (this.getToken) {
        await doLogout();
      }
      this.setToken();
      this.setUserInfo();
      router.push('/login');
    },
  },
});

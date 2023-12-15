import { defineStore } from 'pinia';
import type { RemovableRef } from '@vueuse/core';
import { router } from '@/router';
import { PageEnum, TOKEN_KEY, USER_INFO_KEY } from '@/settings';
import { doLogout, getUserInfo, login, LoginParams, UserInfo } from '@/api/user';

interface UserState {
  userInfo: RemovableRef<UserInfo>;
  token: RemovableRef<string | null>;
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    userInfo: useStorage(USER_INFO_KEY, {} as UserInfo),
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
    setUserInfo(info?: UserInfo) {
      this.userInfo = info || ({} as UserInfo);
    },
    async login(params: LoginParams) {
      try {
        const { accessToken } = await login(params);
        this.setToken(accessToken);

        await this.afterLoginAction();
        // 判断是否有重定向地址
        // 如果有, 则跳转到重定向地址, 否则跳转到首页
        const redirect = router.currentRoute.value.query.redirect;
        router.push(redirect ? (redirect as string) : PageEnum.BASE_HOME);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(): Promise<UserInfo | null> {
      if (!this.token) return null;
      const userInfo = await this.getUserInfoAction();
      return userInfo;
    },
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

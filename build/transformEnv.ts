export interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_DROP_CONSOLE: boolean;
  VITE_PROXY: string;

  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_API_URL_PREFIX: string;
}

export const transformEnv = (env: Record<keyof ViteEnv, string>): ViteEnv => {
  return {
    VITE_PORT: Number(env.VITE_PORT),
    VITE_PUBLIC_PATH: env.VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE: env.VITE_DROP_CONSOLE === 'true',
    VITE_PROXY: env.VITE_PROXY,

    VITE_GLOB_APP_TITLE: env.VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL_PREFIX: env.VITE_GLOB_API_URL_PREFIX,
  };
};

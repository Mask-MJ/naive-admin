import path from 'node:path';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { ClientSideLayout } from 'vite-plugin-vue-layouts';
// import Layouts from 'vite-plugin-vue-layouts';
import { configAutoImportPlugin } from './autoImport';

export function createVitePlugins(): PluginOption[] {
  return [
    VueRouter({
      dts: './types/typed-router.d.ts',
      extensions: ['.page.vue'],
    }),
    vue(),
    mkcert(),
    VueI18nPlugin({
      runtimeOnly: true,
      include: [path.resolve(process.cwd(), 'src/locales/lang/**')],
    }),
    Unocss(),
    ClientSideLayout({
      layoutDir: 'src/layouts',
      defaultLayout: 'default',
      importMode: 'async',
    }),
    // Layouts(),
    ...configAutoImportPlugin(),
  ];
}

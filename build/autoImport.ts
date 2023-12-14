import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import { unheadVueComposablesImports } from '@unhead/vue';

export function configAutoImportPlugin() {
  return [
    AutoImport({
      // 自动导入 vue vue-router
      imports: [
        'vue',
        'vue-i18n',
        VueRouterAutoImports,
        unheadVueComposablesImports,
        '@vueuse/core',
        {
          'vue-router/auto': ['useLink'],
        },
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      dirs: ['src/store/modules', 'src/components/Common'],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
  ];
}

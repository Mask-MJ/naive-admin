import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const locale = localStorage.getItem('LANG__KEY') || 'zh-CN';

export const i18n = createI18n({
  legacy: false,
  locale,
  messages,
});

export function setupI18n(app: App) {
  app.use(i18n);
}

import type { App } from 'vue';

import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';

const locale = useStorage('LANGUAGE__', 'zh-CN');
// const locale = localStorage.getItem('LANGUAGE__') || 'zh-CN';

export const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  messages,
});

export function setupI18n(app: App) {
  app.use(i18n);
}

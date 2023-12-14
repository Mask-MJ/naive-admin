import 'uno.css';
import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from '@/store';
import { setupI18n } from '@/locales';
import { setupRouter } from '@/router';
import { createHead } from '@unhead/vue';
// Create a global head instance

function setupApp() {
  // const appLoading = createApp(AppLoading);
  // appLoading.mount('#appLoading');
  const app = createApp(App);
  const head = createHead();
  // 配置 store
  setupStore(app);
  // 多语言
  setupI18n(app);
  // 配置路由
  setupRouter(app);

  app.use(head);
  app.mount('#app');
}

setupApp();

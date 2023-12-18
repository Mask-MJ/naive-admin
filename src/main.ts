import 'uno.css';
import '@/styles/index.scss';

import App from './App.vue';
import { createHead } from '@unhead/vue';
import { createApp } from 'vue';

import { setupI18n } from '@/locales';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';

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

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersistedState);

for (const [key, component] of Object.entries(ElementPlusIconsVue))
{
  app.component(key, component);
}

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount('#app');

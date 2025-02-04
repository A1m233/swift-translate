import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import TranslateView from '@/views/TranslateView.vue';
import HistoryTranslationView from '@/views/HistoryTranslationView.vue';
import StarredTranslationView from '@/views/StarredTranslationView.vue';
import { useStore } from '@/stores/store.js';

const router = createRouter(
{
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:
  [
    { path: '/', component: HomeView, meta: {title: '首页'} },
    { path: '/translate', component: TranslateView, meta: {title: '翻译'} },
    { path: '/history', component: HistoryTranslationView, meta: {title: '历史'} },
    { path: '/starred', component: StarredTranslationView, meta: {title: '收藏'} },
  ],
});

router.beforeEach((to, from, next) =>
{
  if (to.meta && to.meta.title)
  {
    document.title = 'SwiftTranslate - ' + to.meta.title;
  }
  const store = useStore();
  store.storeCurrentLocation(to.path);
  next();
});

export default router;

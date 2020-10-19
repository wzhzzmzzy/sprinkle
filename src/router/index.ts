import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Segment',
    component: () => import('../views/segment/segment.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine/mine.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

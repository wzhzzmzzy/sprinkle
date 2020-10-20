import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Segment',
    component: () => import('@/views/segment/segment.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine/mine.vue'),
    children: [
      {
        path: '',
        redirect: '/mine/cookies'
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('@/views/settings/settings.vue')
      },
      {
        name: 'my-cookies',
        path: 'cookies',
        component: () => import('@/views/my-cookies/my-cookies.vue')
      },
      {
        name: 'my-subscribe',
        path: 'subscribe',
        component: () => import('@/views/my-subscribe/my-subscribe.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

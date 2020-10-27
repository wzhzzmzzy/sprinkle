import flatten from 'lodash/flatten';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { CHANNEL_ROUTES } from '@/utils/constants';
import { ChannelRoute } from '@/types';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/t/home'
  },
  {
    path: '/t',
    name: 'Segment',
    component: () => import('@/views/segment/segment.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      ...flatten(CHANNEL_ROUTES.filter(router => router.title !== '常用').map(routeArray =>
        (routeArray.children as ChannelRoute[]).map(route => ({
          component: () => import('@/views/channel/channel.vue'),
          path: route.title,
          name: route.title
        }))
      ))]
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
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'not-found',
  //   component: () => import('@/error/404.vue')
  // }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach((to, from, next) => {
  const { _env_ } = from.query;
  if (_env_ && _env_ !== to.query._env_) {
    to.query._env_ = _env_;
    next(to);
  } else {
    next();
  }
});

export default router;

import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { pull } from 'lodash/fp';
import { ChannelRoute, ExpendStatus } from '@/types';
import { COOKIE_KEY } from './constants';

export function useExpendMenu () {
  const route = useRoute();
  const router = useRouter();
  const currentChannelTitle = computed(() => {
    return route.name;
  });
  const switchChannel = (channel: ChannelRoute) => router.push({ name: channel.title });
  const listExpendStatus = reactive<ExpendStatus>({
    favourite: false,
    general: true,
    acg: true,
    game: true,
    'acg-mix': true,
    real: true,
    admin: true
  });
  const toggleSideList = (name: string) => {
    listExpendStatus[name] = !listExpendStatus[name];
  };
  return {
    currentChannelTitle,
    listExpendStatus,
    toggleSideList,
    switchChannel
  };
}

export function useCookie () {
  const store = useStore();
  const cookies = computed<string[]>(() => store.state.user.cookies);
  const currentCookie = computed<string>(() => store.state.user.currentCookie);
  const switchCookie = (cookie: string) => {
    if (cookies.value.includes(cookie) && currentCookie.value !== cookie) {
      store.dispatch('user/switchCookie', cookie).catch(e => console.warn(e));
    }
  };
  const removeCookie = (cookie: string) => {
    const newCookies = pull(cookie)(cookies.value);
    if (cookies.value.includes(cookie)) {
      store.dispatch('user/setCookies', newCookies).catch(e => console.warn(e));
      if (currentCookie.value === cookie) {
        store.dispatch('user/switchCookie', newCookies[0]).catch(e => console.warn(e));
      }
    }
  };
  const localCookie = window.localStorage.getItem(COOKIE_KEY);
  if (localCookie) {
    switchCookie(localCookie);
  }
  return {
    switchCookie,
    removeCookie,
    cookies,
    currentCookie
  };
}

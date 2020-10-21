import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ChannelRoute, ExpendStatus } from '@/types';

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
  const COOKIE_KEY = 'ralph-nmb-cookie';
  const store = useStore();
  const switchCookie = (cookie: string) => store.commit('user/switchCookie', cookie);
  const localCookie = window.localStorage.getItem(COOKIE_KEY);
  if (localCookie) {
    switchCookie(localCookie);
  }
}

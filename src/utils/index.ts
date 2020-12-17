import { computed, ComputedRef, reactive, Ref, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { head, flow, pull, findLast, lt, curryRight } from 'lodash';
import { ChannelRoute, ExpendStatus } from '/@/types';
import { COOKIE_KEY } from './constants';

export function useExpendMenu () {
  const route = useRoute();
  const router = useRouter();
  const currentChannelTitle = computed(() => {
    return route.name;
  });
  const switchChannel = (channel: ChannelRoute) => router.push({ name: channel.title, });
  const listExpendStatus = reactive<ExpendStatus>({
    favourite: false,
    general: true,
    acg: true,
    game: true,
    'acg-mix': true,
    real: true,
    admin: true,
  });
  const toggleSideList = (name: string) => {
    listExpendStatus[name] = !listExpendStatus[name];
  };
  return {
    currentChannelTitle,
    listExpendStatus,
    toggleSideList,
    switchChannel,
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
    const newCookies = pull(cookies.value, cookie);
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
    currentCookie,
  };
}

export function useTimestampInterval (inRenderFunc?: ((time: Date, now: Date) => string) | null) {
  // 原始数据interface
  interface TimestampClass {
    [timestampKey: string]: Date;
  }
  // 渲染计算对象interface
  interface TimestampRenderClass {
    [timestampRenderKey: string]: ComputedRef<string>;
  }

  const timestampObj: TimestampClass = {}; // 用于保存原始Date数据
  const timestampRenderObj: TimestampRenderClass = {}; // 用于保存对应于原始数据的计算属性
  const nowTime: Ref<Date> = ref(new Date()); // 用于保存当前时间，并作为计算属性的依赖来触发更新

  // 设定与清除计时器
  watchEffect(onInvalidate => {
    const refreshNowTimeInterval = setInterval(() => {
      nowTime.value = new Date();
    }, 60000); // 更新当前时间的计时器
    onInvalidate(() => {
      clearInterval(refreshNowTimeInterval);
    });
  });

  // 用于格式化输出
  const fullNumber = (num: number): string => {
    return (num < 10 ? '0' : '') + num;
  };

  const renderFunc = inRenderFunc || ((time: Date, now: Date) => {
    const diff = now.getTime() - time.getTime();
    const timeSliceEnum = [
      [Infinity, `${time.getFullYear()}/${(time.getMonth() + 1)}/${time.getDate()}
      ${fullNumber(time.getHours())}:${fullNumber(time.getMinutes())}`],
      [172800000, '昨天'],
      [86400000, `${Math.floor(diff / 3600000)} 小时前`],
      [3600000, `${Math.floor(diff / 60000)} 分钟前`],
      [60000, '刚刚']
    ];
    const timeSlice = findLast(timeSliceEnum, flow([head, curryRight(lt)(diff)]));
    return timeSlice[1];
  });

  // 用于添加Date对象并返回计算值的引用
  return (i: string|number|Date) => {
    const tempTimestamp: Date = new Date(i);
    tempTimestamp.setSeconds(0);
    tempTimestamp.setMilliseconds(0);
    const timestampKey = tempTimestamp.getTime() + '';
    if (!(timestampKey in timestampObj)) {
      timestampObj[timestampKey] = tempTimestamp;
      timestampRenderObj[timestampKey] = computed(() => {
        return renderFunc(timestampObj[timestampKey], nowTime.value);
      });
    }
    return timestampRenderObj[timestampKey];
  };
}

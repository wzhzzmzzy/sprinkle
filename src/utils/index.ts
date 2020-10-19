import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChannelRoute } from '@/utils/constants';

interface ExpendStatus {
  [index: string]: boolean;
}

export function useExpendMenu () {
  const currentChannelName = ref('时间线');
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
  const switchChannel = (channel: ChannelRoute) => {
    currentChannelName.value = channel.name;
  };
  return {
    currentChannelName,
    listExpendStatus,
    toggleSideList,
    switchChannel
  };
}

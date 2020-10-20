import { createStore } from 'vuex';
import { userState, userMutations } from '@/store/user';
import { globalState, globalMutations } from '@/store/global';

export default createStore({
  modules: {
    user: {
      namespaced: true,
      state: userState,
      mutations: userMutations
    },
    global: {
      state: globalState,
      mutations: globalMutations
    }
  }
});

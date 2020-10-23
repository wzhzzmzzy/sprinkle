import { createStore } from 'vuex';
import { userState, userMutations, userActions } from '@/store/user';
import { globalState, globalMutations } from '@/store/global';

export default createStore({
  modules: {
    user: {
      namespaced: true,
      state: userState,
      mutations: userMutations,
      actions: userActions
    },
    global: {
      state: globalState,
      mutations: globalMutations
    }
  }
});

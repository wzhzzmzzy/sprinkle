import { createStore } from 'vuex';
import { userState, userMutations } from './user';

export default createStore({
  modules: {
    user: {
      namespaced: true,
      state: userState,
      mutations: userMutations
    }
  }
});

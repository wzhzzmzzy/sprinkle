import { createStore } from 'vuex';
import { userState, userMutations, userActions } from '@/store/user';
import { globalState, globalMutations } from '@/store/global';
import { gameAction, gameMutation, gameState } from '@/store/game';

export default createStore({
  modules: {
    game: {
      namespaced: true,
      state: gameState,
      mutations: gameMutation,
      actions: gameAction
    },
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

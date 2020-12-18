import { MutationTree, ActionTree } from 'vuex';
import { UserState, RootState } from '/@/types';
import { COOKIE_KEY, COOKIES_KEY } from '/@/utils/constants';

const TEST_COOKIES = [
  'test-cookie1',
  'test-cookie2',
  'test-cookie3',
  'test-cookie4',
  'test-cookie5'
];

export const userState: () => UserState = () => ({
  token: '',
  cookies: TEST_COOKIES,
  currentCookie: 'test-cookie1',
});

export const userMutations: MutationTree<UserState> = {
  setToken (state, payload: string) {
    state.token = payload;
  },
  switchCookie (state, payload: string) {
    state.currentCookie = payload;
  },
  setCookies (state, payload: string[]) {
    state.cookies = payload;
  },
};

export const userActions: ActionTree<UserState, RootState> = {
  switchCookie ({ commit, }, payload: string) {
    console.log('[switchCookie]', payload);
    commit('switchCookie', payload);
    window.localStorage.setItem(COOKIE_KEY, payload);
  },
  setCookies ({ commit, }, payload: string[]) {
    console.log('[setCookies]', payload);
    commit('setCookies', payload);
    window.localStorage.setItem(COOKIES_KEY, JSON.stringify(payload));
  },
};

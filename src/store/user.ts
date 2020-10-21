import { MutationTree } from 'vuex';
import { UserState } from '@/types';

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
  currentCookie: 'test-cookie1'
});

export const userMutations: MutationTree<UserState> = {
  setToken (state, payload: string) {
    state.token = payload;
  }
};

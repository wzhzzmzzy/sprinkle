import { MutationTree } from 'vuex';

interface UserState {
  token: string;
}

export const userState: () => UserState = () => ({
  token: ''
});

export const userMutations: MutationTree<UserState> = {
  setToken (state, payload: string) {
    state.token = payload;
  }
};

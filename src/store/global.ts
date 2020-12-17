import { MutationTree } from 'vuex';
import { GlobalState } from '/@/types';

export const globalState: () => GlobalState = () => ({
  editorVisible: false,
});

export const globalMutations: MutationTree<GlobalState> = {
  toggleEditorModal (state, payload: boolean) {
    state.editorVisible = payload;
  },
};

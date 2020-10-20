import { MutationTree } from 'vuex';

interface GlobalState {
  editorVisible: boolean;
}

export const globalState: () => GlobalState = () => ({
  editorVisible: false
});

export const globalMutations: MutationTree<GlobalState> = {
  toggleEditorModal (state, payload: boolean) {
    state.editorVisible = payload;
  }
};

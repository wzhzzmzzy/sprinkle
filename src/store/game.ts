import { MutationTree, ActionTree } from 'vuex';
import { GameState, RootState } from '@/types';
import { getTypeRacerText } from '@/api';

export const gameState: () => GameState = () => ({
  racerText: '',
  inputText: ''
});

export const gameMutation: MutationTree<GameState> = {
  updateFields (state, payload) {
    Object.keys(payload).forEach((key) => {
      (state as any)[key] = payload[key];
    });
  }
};

export const gameAction: ActionTree<GameState, RootState> = {
  async fetchRacerText ({ commit }) {
    try {
      const { data } = await getTypeRacerText();
      commit('updateFields', {
        racerText: data
      });
    } catch (e) {
      // nothing
    }
  }
};

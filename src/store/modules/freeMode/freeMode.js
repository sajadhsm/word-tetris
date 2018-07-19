import * as logic from './logic';

const state = {
  words: [],
  characters: [],
  score: 0,
  matchWords: 0,
};

const getters = {
  /** return a random character from state.characters */
  randomChar() {
    const r = Math.floor(Math.random() * state.characters.length);
    return state.characters[r];
  },
};

const mutations = {
  SET_WORDS(state, words) {
    state.words = words;
  },

  /** Extract all unique characters used in state.words */
  SET_CHARACTERS(state) {
    // if it's already sat no need to refill
    if (state.characters.length) return;

    state.characters = state.words.reduce((chars, word) => {
      word.split('').forEach((char) => {
        if (!chars.includes(char)) chars.push(char);
      });

      return chars;
    }, []);
  },

  SET_SCORE(state, value) {
    state.score = value;
  },

  SET_MATCH_WORDS(state, value) {
    state.matchWords = value;
  },
};

const actions = {
  initialStart({ commit }) {
    commit('SET_CURRENT_CHAR', getters.randomChar(), { root: true });
    commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
    commit('SET_CURRENT_BLOCK', null, { root: true });
  },

  moveLeft({ commit, dispatch, rootState }) {
    if (
      !rootState.isGameRunning ||
      logic.leftIsWall(rootState) ||
      logic.leftIsBlock(rootState)
    ) return;

    dispatch('blockToLeft', null, { root: true });
    commit('CLEAR_LAST_BLOCK', null, { root: true });
    commit('SET_CURRENT_BLOCK', null, { root: true });
  },

  moveRight({ commit, dispatch, rootState }) {
    if (
      !rootState.isGameRunning ||
      logic.rightIsWall(rootState) ||
      logic.rightIsBlock(rootState)
    ) return;

    dispatch('blockToRight', null, { root: true });
    commit('CLEAR_LAST_BLOCK', null, { root: true });
    commit('SET_CURRENT_BLOCK', null, { root: true });
  },

  moveDown({ commit, dispatch, rootState }) {
    if (!rootState.isGameRunning) return;

    if (
      logic.noMoreRow(rootState) ||
      logic.bottomIsBlock(rootState)
    ) {
      logic.checkForMatchWord(commit, rootState, state);

      // Change game over condition
      if (
        rootState.currentRow === 0 &&
        logic.bottomIsBlock(rootState)
      ) {
        commit('SET_GAME_OVER', true, { root: true });
        console.log('GAME OVER :(');
        return;
      }

      dispatch('setSpawnLoacation', null, { root: true });
      commit('SET_CURRENT_CHAR', rootState.nextChar, { root: true });
      commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
      commit('SET_CURRENT_BLOCK', null, { root: true });
      return;
    }

    dispatch('blockToBottom', null, { root: true });
    commit('CLEAR_LAST_BLOCK', null, { root: true });
    commit('SET_CURRENT_BLOCK', null, { root: true });
  },

  resetStates({ commit }) {
    commit('SET_SCORE', 0);
    commit('SET_MATCH_WORDS', 0);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

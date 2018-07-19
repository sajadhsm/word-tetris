import * as hit from '../hitConditions';
import checkForMatchWord from './wordMatchCheck';

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

  moveLeft({ dispatch, rootState }) {
    if (
      !rootState.isGameRunning ||
      hit.leftIsWall(rootState) ||
      hit.leftIsBlock(rootState)
    ) return;

    dispatch('moveBlock', 'Left', { root: true });
  },

  moveRight({ dispatch, rootState }) {
    if (
      !rootState.isGameRunning ||
      hit.rightIsWall(rootState) ||
      hit.rightIsBlock(rootState)
    ) return;

    dispatch('moveBlock', 'Right', { root: true });
  },

  moveDown({ commit, dispatch, rootState }) {
    if (!rootState.isGameRunning) return;

    if (
      hit.noMoreRow(rootState) ||
      hit.bottomIsBlock(rootState)
    ) {
      checkForMatchWord(commit, rootState, state);

      // Change game over condition
      if (
        rootState.currentRow === 0 &&
        hit.bottomIsBlock(rootState)
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

    dispatch('moveBlock', 'Bottom', { root: true });
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

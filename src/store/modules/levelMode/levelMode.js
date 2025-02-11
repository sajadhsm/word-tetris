import * as hit from '../hitConditions';
import checkForMatchWord from './wordMatchCheck';

const state = {
  levels: [],
  currentLevel: 0,
  levelCharacters: [],
  win: false,
};

const getters = {
  randomChar() {
    // If the levelCharacters length is 0 SET_LEVEL_CHARACTERS will be
    // called in the movement actions to refill it!
    const r = Math.floor(Math.random() * state.levelCharacters.length);
    return state.levelCharacters.splice(r, 1)[0];
  },

  levelWordLen() {
    return state.levelCharacters.length;
  },

  levelTime() {
    if (!state.levels.length) {
      return {
        seconds: 30,
        minutes: 1,
      };
    }
    return state.levels[state.currentLevel].time;
  },

  levelWord() {
    return state.levels[state.currentLevel].word;
  },

  levelSpeed() {
    return state.levels[state.currentLevel]
      .speed || 1000;
  },

  currentLevelNatural() {
    return state.currentLevel + 1;
  },

  currentLevelObject() {
    return state.levels[state.currentLevel];
  },
};

const mutations = {
  SET_LEVELS(state, levels) {
    state.levels = levels;
  },

  SET_CURRENT_LEVEL(state, level) {
    state.currentLevel = level;
  },

  /** Fill the levelCharacters with current level word characters */
  SET_LEVEL_CHARACTERS(state) {
    if (!state.levels.length) return;

    state.levelCharacters = state.levels[state.currentLevel]
      .word.split('').map(char => char);
  },

  SET_WIN(state, status) {
    state.win = status;
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
      if (checkForMatchWord(rootState, state)) {
        commit('SET_WIN', true);
        // STORE STATES?
        // Or do them in the win page
        return;
      }

      // Set the next block spawn location before
      // game over check, because the game should over
      // if next block is unable to placed into spawn location
      dispatch('setSpawnLoacation', null, { root: true });

      if (
        rootState.currentRow === 0 &&
        hit.bottomIsBlock(rootState)
      ) {
        commit('SET_GAME_OVER', true, { root: true });
        return;
      }

      commit('SET_CURRENT_CHAR', rootState.nextChar, { root: true });
      commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
      commit('SET_CURRENT_BLOCK', null, { root: true });

      // Each block placement cause one character pop from
      // levelCharacters array! So we need to refill it
      // when it gets empty!
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

    dispatch('moveBlock', 'Bottom', { root: true });
  },

  resetStates({ commit }) {
    commit('SET_WIN', false);
    commit('SET_LEVEL_CHARACTERS');
    commit('SET_TIME', getters.levelTime(), { root: true });
  },

  nextLevel({ commit }) {
    const nextLevel = state.currentLevel + 1;

    if (nextLevel < state.levels.length) {
      commit('SET_CURRENT_LEVEL', nextLevel);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

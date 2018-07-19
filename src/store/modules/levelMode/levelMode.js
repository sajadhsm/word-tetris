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
    // if the arr length is 0 SET_LEVEL_CHARACTERS will be called
    // in the movement actions
    const r = Math.floor(Math.random() * state.levelCharacters.length);
    return state.levelCharacters.splice(r, 1)[0];
  },

  levelWordLen() {
    return state.levelCharacters.length;
  },

  levelTime() {
    return state.levels[state.currentLevel].time;
  },

  levelWord() {
    return state.levels[state.currentLevel].word;
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

  SET_LEVEL_CHARACTERS(state) {
    // Return an array of current level word characters
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

  moveLeft({ commit, dispatch, rootState }) {
    if (
      !rootState.isGameRunning ||
      hit.leftIsWall(rootState) ||
      hit.leftIsBlock(rootState)
    ) return;

    if (
      hit.leftIsBlock(rootState) &&
      hit.bottomIsBlock(rootState)
    ) {
      dispatch('setSpawnLocation', null, { root: true });
      commit('SET_CURRENT_CHAR', rootState.nextChar, { root: true });
      commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
      commit('SET_CURRENT_BLOCK', null, { root: true });

      // Getter arr 0 length handle
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

    dispatch('moveBlock', 'Left', { root: true });
  },

  moveRight({ commit, dispatch, rootState }) {
    if (
      !rootState.isGameRunning ||
      hit.rightIsWall(rootState) ||
      hit.rightIsBlock(rootState)
    ) return;

    if (
      hit.rightIsBlock(rootState) &&
      hit.bottomIsBlock(rootState)
    ) {
      dispatch('setSpawnLocation', null, { root: true });
      commit('SET_CURRENT_CHAR', rootState.nextChar, { root: true });
      commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
      commit('SET_CURRENT_BLOCK', null, { root: true });

      // Getter arr 0 length handle
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

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

      // Getter arr 0 length handle
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

    dispatch('moveBlock', 'Bottom', { root: true });
  },

  resetStates({ commit }) {
    commit('SET_WIN', false);
    commit('SET_LEVEL_CHARACTERS');
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

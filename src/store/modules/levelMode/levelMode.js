import * as logic from './logic';

// NOTE: Wrap dublicated movement codes into functions

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
      logic.leftIsWall(rootState) ||
      logic.leftIsBlock(rootState)
    ) return;

    if (
      logic.leftIsBlock(rootState) &&
      logic.bottomIsBlock(rootState)
    ) {
      dispatch('setSpawnLocation', null, { root: true });
      commit('SET_CURRENT_CHAR', rootState.nextChar, { root: true });
      commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
      commit('SET_CURRENT_BLOCK', null, { root: true });

      // Getter arr 0 length handle
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

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

    if (
      logic.rightIsBlock(rootState) &&
      logic.bottomIsBlock(rootState)
    ) {
      dispatch('setSpawnLocation', null, { root: true });
      commit('SET_CURRENT_CHAR', rootState.nextChar, { root: true });
      commit('SET_NEXT_CHAR', getters.randomChar(), { root: true });
      commit('SET_CURRENT_BLOCK', null, { root: true });

      // Getter arr 0 length handle
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

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
      if (logic.checkForMatchWord(rootState, state)) {
        commit('SET_WIN', true);
        // STORE STATES?
        // Or do them in the win page
        return;
      }

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

      // Getter arr 0 length handle
      if (!state.levelCharacters.length) commit('SET_LEVEL_CHARACTERS');

      return;
    }

    dispatch('blockToBottom', null, { root: true });
    commit('CLEAR_LAST_BLOCK', null, { root: true });
    commit('SET_CURRENT_BLOCK', null, { root: true });
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

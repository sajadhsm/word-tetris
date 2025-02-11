export const increaseTime = ({ commit }) => {
  commit('INCREASE_TIME');
};

export const decreaseTime = ({ commit }) => {
  commit('DECREASE_TIME');
};

export const setGameOver = ({ commit }, status) => {
  commit('SET_GAME_OVER', status);
};

export const setBoard = ({ commit }) => {
  commit('SET_BOARD');
};

export const clearBoard = ({ commit }) => {
  commit('CLEAR_BOARD');
};

export const resetGameState = ({ commit }) => {
  commit('RESET_GAME_STATE');
};

export const setIsGameRunning = ({ commit }, status) => {
  commit('SET_IS_GAME_RUNNING', status);
};

export const blockToLeft = ({ commit, state }) => {
  commit('SET_LAST_COL', state.currentCol);
  commit('SET_LAST_ROW', state.currentRow);
  commit('SET_CURRENT_COL', state.currentCol - 1);
};

export const blockToRight = ({ commit, state }) => {
  commit('SET_LAST_COL', state.currentCol);
  commit('SET_LAST_ROW', state.currentRow);
  commit('SET_CURRENT_COL', state.currentCol + 1);
};

export const blockToBottom = ({ commit, state }) => {
  commit('SET_LAST_COL', state.currentCol);
  commit('SET_LAST_ROW', state.currentRow);
  commit('SET_CURRENT_ROW', state.currentRow + 1);
};

/** Move the block to given direction and clear behind block */
export const moveBlock = ({ commit, dispatch }, direction) => {
  dispatch(`blockTo${direction}`);
  commit('CLEAR_LAST_BLOCK');
  commit('SET_CURRENT_BLOCK');
};

export const setSpawnLoacation = ({ commit, state }) => {
  commit('SET_LAST_COL', 0);
  commit('SET_LAST_ROW', 0);
  commit('SET_CURRENT_ROW', 0);
  commit('SET_CURRENT_COL', Math.floor((state.cols - 1) / 2));
};

export const resetGlobalStates = ({ commit }) => {
  commit('SET_IS_GAME_RUNNING', false);
  commit('SET_GAME_OVER', false);

  commit('SET_CURRENT_CHAR', '');
  commit('SET_NEXT_CHAR', '');

  commit('SET_CURRENT_ROW', 0);
  commit('SET_CURRENT_COL', 0);

  commit('SET_LAST_ROW', 0);
  commit('SET_LAST_COL', 0);

  // Time gets reset by modules
};

export const updateScoreBoard = ({ commit }, item) => {
  commit('ADD_TO_SCORE_BOARD', item);
  commit('SORT_AND_FIX_SCORE_BOARD');
};

/* eslint-disable */

export function leftIsWall(state) {
  return state.currentCol - 1 < 0;
}

export function rightIsWall(state) {
  return state.currentCol + 1 > state.cols - 1;
}

export function leftIsBlock(state) {
  return state.board[state.currentRow][state.currentCol - 1].content !== '';
}

export function rightIsBlock(state) {
  return state.board[state.currentRow][state.currentCol + 1].content !== '';
}

export function bottomIsBlock(state) {
  return state.board[state.currentRow + 1][state.currentCol].content !== '';
}

export function noMoreRow(state) {
  return state.currentRow + 1 > state.rows - 1;
}

export function checkForMatchWord(rootState, localState) {
  const currentRow = rootState.board[rootState.currentRow];
  
  // Check if all the row blocks are filled
  // (So the check process only happens when needed!)
  for (let i = 0; i < currentRow.length; i += 1) {
    if (!currentRow[i].content) return;
  }

  // Build a word out of row blocks
  const word = currentRow.reduce((word, block) => {
    word += block.content;
    return word;
  }, '').split('').reverse().join('');

  const levelWord = localState.levels[localState.currentLevel].word;

  if (word === levelWord) return true;
};

/* eslint-disable no-param-reassign */

export default function checkForMatchWord(commit, rootState, localState) {
  let cr = rootState.currentRow;
  let cc = rootState.currentCol - 1;
  let found = false;
  let word = '';

  // Left side of current block
  while (!found && cc >= 0 && rootState.board[cr][cc].content !== '') {
    word = rootState.currentChar;

    for (let i = rootState.currentCol - 1; i === cc; i -= 1) {
      console.log(rootState.board[cr][i].content);
      word += rootState.board[cr][i].content;
    }

    if (localState.words.includes(word)) {
      const blocks = [];
      for (let i = cc; i <= rootState.currentCol; i += 1) {
        blocks.push({
          row: cr,
          col: i,
        });
      }
      commit('CLEAR_WORD_BLOCKS', blocks, { root: true });
      found = true;
      localState.score += 10;
      localState.matchWords += 1;
      return;
    }
    cc -= 1;
  }

  // Right side of current block
  cc = rootState.currentCol + 1;
  while (!found && cc < rootState.cols && rootState.board[cr][cc].content !== '') {
    word = rootState.currentChar;

    for (let i = rootState.currentCol + 1; i === cc; i += 1) {
      word += rootState.board[cr][i].content;
      console.log(rootState.board[cr][i].content, word);
    }

    word = word.split('').reverse().join('');

    if (localState.words.includes(word)) {
      const blocks = [];
      for (let i = rootState.currentCol; i <= cc; i += 1) {
        blocks.push({
          row: cr,
          col: i,
        });
      }
      commit('CLEAR_WORD_BLOCKS', blocks, { root: true });
      found = true;
      localState.score += 10;
      localState.matchWords += 1;
      return;
    }
    cc += 1;
  }

  // Current block bottom
  cc = rootState.currentCol;
  cr = rootState.currentRow + 1;
  while (!found && cr < rootState.rows && rootState.board[cr][cc].content !== '') {
    word = rootState.currentChar;

    for (let i = rootState.currentRow + 1; i === cr; i += 1) {
      console.log(rootState.board[i][cc].content);
      word += rootState.board[i][cc].content;
    }

    if (localState.words.includes(word)) {
      const blocks = [];
      for (let i = rootState.currentRow; i <= cr; i += 1) {
        blocks.push({
          row: i,
          col: cc,
        });
      }
      commit('CLEAR_WORD_BLOCKS', blocks, { root: true });
      found = true;
      localState.score += 10;
      localState.matchWords += 1;
      return;
    }
    cr += 1;
  }

  // Check possible currect word when a character placed between two other blocks
  let wordRightIndex = rootState.currentCol;
  let wordLeftIndex = rootState.currentCol;

  // Find the right most index of the possible word
  while (
    wordRightIndex < rootState.cols - 1 &&
    rootState.board[rootState.currentRow][wordRightIndex].content !== ''
  ) {
    wordRightIndex += 1;
  }
  // Find the left most index of the possible word
  while (
    wordLeftIndex > 0 &&
    rootState.board[rootState.currentRow][wordLeftIndex].content !== ''
  ) {
    wordLeftIndex -= 1;
  }

  // Create words from right to left and check if any of them
  // is in the word lists
  for (let i = wordRightIndex; i > wordLeftIndex; i -= 1) {
    word = rootState.board[rootState.currentRow][i].content;
    const blocks = [{
      row: rootState.currentRow,
      col: i,
    }];

    for (let j = i - 1; j > wordLeftIndex; j -= 1) {
      word += rootState.board[rootState.currentRow][j].content;
      blocks.push({
        row: rootState.currentRow,
        col: j,
      });

      if (localState.words.includes(word)) {
        commit('CLEAR_WORD_BLOCKS', blocks, { root: true });
        localState.score += 10;
        localState.matchWords += 1;
        return;
      }
    }
  }
}

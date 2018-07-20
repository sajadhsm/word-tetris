/* eslint-disable no-param-reassign */
/**
   * this function find all possible words in input array
   *  and return a word that have maximum length in other words (for row)
   * @param {string} array input letters array
   * @param {number} cCol current column index
   * @param {number} cRow current row index
   * @param {object} localState local state
   *
   * @returns {object} maximum word length and its blocks
   */
function maxWordFinderInRow(array, cCol, cRow, localState) {
  let wordRightIndex = cCol;
  let wordLeftIndex = cCol;

  // Find the right most index of the possible word
  while (wordRightIndex < array.length && array[wordRightIndex].content !== '') { wordRightIndex += 1; }

  // Find the left most index of the possible word
  while (wordLeftIndex > -1 && array[wordLeftIndex].content !== '') { wordLeftIndex -= 1; }

  // Create words from right to left and check if any of them
  // is in the word lists
  let maxBlocks = [];
  let maxWordLength = 0;
  for (let i = wordRightIndex - 1; i > wordLeftIndex; i -= 1) {
    let word = array[i].content;
    const blocks = [{
      row: cRow,
      col: i,
    }];
    for (let j = i - 1; j > wordLeftIndex; j -= 1) {
      word += array[j].content;
      blocks.push({
        row: cRow,
        col: j,
      });
      if (localState.words.includes(word)) { // if word found
        if (word.length > maxWordLength) { // if found word is greater than previous maximum word
          maxWordLength = word.length;
          maxBlocks = blocks;
        }
      }
    }
  }
  return {
    blocks: maxBlocks,
    score: maxWordLength,
  };
}

/**
   * this function find all possible words in input array
   * and return a word that have maximum length in other words (for column)
   * @param {string} array input letters array
   * @param {number} cCol current column index
   * @param {number} cRow current row index
   * @param {object} localState local state
   *
   * @returns {object} maximum word length and its blocks
   */
function maxWordFinderInCol(array, cCol, cRow, localState) {
  let wordRightIndex = cRow;
  let wordLeftIndex = cRow;

  // Find the right most index of the possible word
  while (wordRightIndex < array.length && array[wordRightIndex].content !== '') { wordRightIndex += 1; }

  // Find the left most index of the possible word
  while (wordLeftIndex > -1 && array[wordLeftIndex].content !== '') { wordLeftIndex -= 1; }

  // Create words from right to left and check if any of them
  // is in the word lists
  // bottom-up words in column
  let maxBlocks = [];
  let maxWordLength = 0;
  for (let i = wordRightIndex - 1; i > wordLeftIndex; i -= 1) {
    let word = array[i].content;
    const blocks = [{
      row: i,
      col: cCol,
    }];
    for (let j = i - 1; j > wordLeftIndex; j -= 1) {
      word += array[j].content;
      blocks.push({
        row: j,
        col: cCol,
      });
      if (localState.words.includes(word)) { // if word found
        if (word.length > maxWordLength) { // if found word is greater than previous maximum word
          maxWordLength = word.length;
          maxBlocks = blocks;
        }
      }
    }
  }
  // top-down words in column
  for (let i = wordLeftIndex + 1; i < wordRightIndex; i += 1) {
    let word = array[i].content;
    const blocks = [{
      row: i,
      col: cCol,
    }];
    for (let j = i + 1; j < wordRightIndex; j += 1) {
      word += array[j].content;
      blocks.push({
        row: j,
        col: cCol,
      });
      if (localState.words.includes(word)) { // if word found
        if (word.length > maxWordLength) { // if found word is greater than previous maximum word
          maxWordLength = word.length;
          maxBlocks = blocks;
        }
      }
    }
  }
  return {
    blocks: maxBlocks,
    score: maxWordLength,
  };
}
/**
   * this function check board to find match word/s
   * @param {object} commit commit module
   * @param {object} rootState root tate
   * @param {object} localState local state
   *
   * @returns {null}
   */
export default function checkForMatchWord(commit, rootState, localState) {
  let blocks = [];
  const rowArray = rootState.board[rootState.currentRow];
  // ^ rowArray creation
  const row = maxWordFinderInRow(rowArray, rootState.currentCol, rootState.currentRow, localState);

  const colArray = [];
  // #region colArray creation
  for (let i = 0; i < rootState.rows; i += 1) {
    const block = rootState.board[i][rootState.currentCol];
    if (block.content === '') { block.content = ''; }
    colArray.push(block);
  }
  // #endregion
  const col = maxWordFinderInCol(colArray, rootState.currentCol, rootState.currentRow, localState);

  // blocks of column and row that should be removed
  blocks = blocks.concat(blocks, col.blocks, row.blocks);

  // if have blocks, clear them in board and calculate score
  if (blocks.length !== 0) {
    commit('CLEAR_WORD_BLOCKS', blocks, { root: true });
    localState.score += (row.score + col.score);
    if (row.score === 0) {
      localState.matchWords += 1;
    } else if (col.score === 0) { localState.matchWords += 1; } else { localState.matchWords += 2; }
  }
}

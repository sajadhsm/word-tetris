/* eslint-disable */
export default function checkForMatchWord(rootState, localState) {
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

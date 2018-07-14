import Vue from 'vue';
import charsBG from '../../data/charactersBG';

const state = {
  words: [],
  characters: [],
  currentChar: '',
  nextChar: '',
  board: [],
  cols: 7,
  rows: 7,
  currentRow: 0,
  currentCol: 0,
  lastRow: 0,
  lastCol: 0,
  score: 0,
  matchWords: 0,
  time: {
    seconds: 0,
    minutes: 0,
  },
  gameOver: false,
  isGameRunning: false,
};

const getters = {
  randomChar() {
    const r = Math.floor(Math.random() * state.characters.length);
    return state.characters[r];
  },
  time() {
    const s = (state.time.seconds < 10) ?
      `0${state.time.seconds}` : state.time.seconds;

    const m = (state.time.minutes < 10) ?
      `0${state.time.minutes}` : state.time.minutes;

    return `${m}:${s}`;
  },
};

const mutations = {
  SET_WORDS(state, words) {
    state.words = words;
  },

  SET_CHARACTERS(state) {
    state.characters = state.words.reduce((chars, word) => {
      word.split('').forEach((char) => {
        if (!chars.includes(char)) chars.push(char);
      });

      return chars;
    }, []);
  },

  SET_BOARD(state) {
    for (let i = 0; i < state.rows; i += 1) {
      state.board.push([]);
      for (let j = 0; j < state.cols; j += 1) {
        state.board[i][j] = {
          content: '',
          background: '',
        };
      }
    }
  },

  START_GAME(state) {
    state.currentChar = getters.randomChar();
    state.nextChar = getters.randomChar();
  },

  SET_CURRENT_CHAR(state) {
    state.currentChar = state.nextChar;
    state.nextChar = getters.randomChar();
  },

  SET_SPAWN_LOCATION(state) {
    state.lastRow = 0;
    state.lastCol = 0;
    state.currentRow = 0;
    state.currentCol = Math.floor((state.cols - 1) / 2);
  },

  INCREASE_TIME(state) {
    state.time.seconds += 1;

    if (state.time.seconds === 59) {
      state.time.seconds = 0;
      state.time.minutes += 1;
    }
  },

  SET_CURRENT_BLOCK(state) {
    // Work on this... Read reactivty of vuejs...
    // Must be a better way of doing this
    Vue.set(state.board[state.currentRow], state.currentCol, {
      content: state.currentChar,
      background: charsBG[state.currentChar] || 'orangered',
    });
  },

  CLEAR_LAST_BLOCK(state) {
    Vue.set(state.board[state.lastRow], state.lastCol, {
      content: '',
      background: '',
    });
  },

  MOVE_LEFT(state) {
    state.lastCol = state.currentCol;
    state.lastRow = state.currentRow;
    state.currentCol -= 1;
  },

  MOVE_RIGHT(state) {
    state.lastCol = state.currentCol;
    state.lastRow = state.currentRow;
    state.currentCol += 1;
  },

  MOVE_DOWN(state) {
    state.lastCol = state.currentCol;
    state.lastRow = state.currentRow;
    state.currentRow += 1;
  },

  CLEAR_WORD_BLOCKS(state, blocks) {
    console.log('CLEAR', blocks);
    blocks.forEach((block) => {
      Vue.set(state.board[block.row], block.col, {
        content: '',
        background: '',
      });

      // Shift top blocks one block to bottom
      let upperBlock = block.row - 1;
      // if it's the top most row
      if (upperBlock < 0) return;

      while (state.board[upperBlock][block.col].content !== '') {
        const blk = state.board[upperBlock][block.col];
        Vue.set(state.board[upperBlock + 1], block.col, {
          content: blk.content,
          background: charsBG[blk.content] || 'orangered',
        });

        upperBlock -= 1;
        // Only clear the top most block
        if (state.board[upperBlock][block.col].content === '') {
          Vue.set(state.board[upperBlock + 1], block.col, {
            content: '',
            background: '',
          });
        }
      }
    });
  },

  CLEAR_BOARD(state) {
    for (let i = 0; i < state.rows; i += 1) {
      for (let j = 0; j < state.cols; j += 1) {
        Vue.set(state.board[i], j, {
          content: '',
          background: '',
        });
      }
    }
  },

  RESET_GAME_STATE(state) {
    state.score = 0;
    state.matchWords = 0;

    state.currentChar = '';
    state.nextChar = '';

    state.currentRow = 0;
    state.currentCol = 0;

    state.lastRow = 0;
    state.lastCol = 0;

    state.time.seconds = 0;
    state.time.minutes = 0;
  },

  SET_GAME_OVER(state, status) {
    state.gameOver = status;
  },

  SET_IS_GAME_RUNNING(state, status) {
    state.isGameRunning = status;
  },
};

// Use a util file for if condications
function leftIsWall() {
  return state.currentCol - 1 < 0;
}

function rightIsWall() {
  return state.currentCol + 1 > state.cols - 1;
}

function leftIsBlock() {
  return state.board[state.currentRow][state.currentCol - 1].content !== '';
}

function rightIsBlock() {
  return state.board[state.currentRow][state.currentCol + 1].content !== '';
}

function bottomIsBlock() {
  return state.board[state.currentRow + 1][state.currentCol].content !== '';
}

function noMoreRow() {
  return state.currentRow + 1 > state.rows - 1;
}

function checkForMatchWord(commit) {
  let cr = state.currentRow;
  let cc = state.currentCol - 1;
  let found = false;
  let word = '';

  // Left side of current block
  while (!found && cc >= 0 && state.board[cr][cc].content !== '') {
    word = state.currentChar;

    for (let i = state.currentCol - 1; i === cc; i -= 1) {
      console.log(state.board[cr][i].content);
      word += state.board[cr][i].content;
    }

    if (state.words.includes(word)) {
      const blocks = [];
      for (let i = cc; i <= state.currentCol; i += 1) {
        blocks.push({
          row: cr,
          col: i,
        });
      }
      commit('CLEAR_WORD_BLOCKS', blocks);
      found = true;
      state.score += 10;
      state.matchWords += 1;
      return;
    }
    cc -= 1;
  }

  // Right side of current block
  cc = state.currentCol + 1;
  while (!found && cc < state.cols && state.board[cr][cc].content !== '') {
    word = state.currentChar;

    for (let i = state.currentCol + 1; i === cc; i += 1) {
      word += state.board[cr][i].content;
      console.log(state.board[cr][i].content, word);
    }

    word = word.split('').reverse().join('');

    if (state.words.includes(word)) {
      const blocks = [];
      for (let i = state.currentCol; i <= cc; i += 1) {
        blocks.push({
          row: cr,
          col: i,
        });
      }
      commit('CLEAR_WORD_BLOCKS', blocks);
      found = true;
      state.score += 10;
      state.matchWords += 1;
      return;
    }
    cc += 1;
  }

  // Current block bottom
  cc = state.currentCol;
  cr = state.currentRow + 1;
  while (!found && cr < state.rows && state.board[cr][cc].content !== '') {
    word = state.currentChar;

    for (let i = state.currentRow + 1; i === cr; i += 1) {
      console.log(state.board[i][cc].content);
      word += state.board[i][cc].content;
    }

    if (state.words.includes(word)) {
      const blocks = [];
      for (let i = state.currentRow; i <= cr; i += 1) {
        blocks.push({
          row: i,
          col: cc,
        });
      }
      commit('CLEAR_WORD_BLOCKS', blocks);
      found = true;
      state.score += 10;
      state.matchWords += 1;
      return;
    }
    cr += 1;
  }

  // Check possible currect word when a character placed between two other blocks
  let wordRightIndex = state.currentCol;
  let wordLeftIndex = state.currentCol;

  // Find the right most index of the possible word
  while (
    wordRightIndex < state.cols - 1 &&
    state.board[state.currentRow][wordRightIndex].content !== ''
  ) {
    wordRightIndex += 1;
  }
  // Find the left most index of the possible word
  while (
    wordLeftIndex > 0 &&
    state.board[state.currentRow][wordLeftIndex].content !== ''
  ) {
    wordLeftIndex -= 1;
  }

  // Create words from right to left and check if any of them
  // is in the word lists
  for (let i = wordRightIndex; i > wordLeftIndex; i -= 1) {
    word = state.board[state.currentRow][i].content;
    const blocks = [{
      row: state.currentRow,
      col: i,
    }];

    for (let j = i - 1; j > wordLeftIndex; j -= 1) {
      word += state.board[state.currentRow][j].content;
      blocks.push({
        row: state.currentRow,
        col: j,
      });

      if (state.words.includes(word)) {
        commit('CLEAR_WORD_BLOCKS', blocks);
        state.score += 10;
        state.matchWords += 1;
        return;
      }
    }
  }
}

const actions = {
  startGame({ commit }) {
    commit('START_GAME');
    commit('SET_CURRENT_BLOCK');
  },

  moveLeft({ commit }) {
    if (!state.isGameRunning || leftIsWall() || leftIsBlock()) return;

    if (leftIsBlock() && bottomIsBlock()) {
      commit('SET_SPAWN_LOCATION');
      commit('SET_CURRENT_CHAR');
      commit('SET_CURRENT_BLOCK');
      return;
    }

    commit('MOVE_LEFT');
    commit('CLEAR_LAST_BLOCK');
    commit('SET_CURRENT_BLOCK');
  },

  moveRight({ commit }) {
    if (!state.isGameRunning || rightIsWall() || rightIsBlock()) return;

    if (rightIsBlock() && bottomIsBlock()) {
      commit('SET_SPAWN_LOCATION');
      commit('SET_CURRENT_CHAR');
      commit('SET_CURRENT_BLOCK');
      return;
    }

    commit('MOVE_RIGHT');
    commit('CLEAR_LAST_BLOCK');
    commit('SET_CURRENT_BLOCK');
  },

  moveDown({ commit }) {
    // Don't move the block
    if (!state.isGameRunning) return;

    if (noMoreRow() || bottomIsBlock()) {
      checkForMatchWord(commit);

      if (state.currentRow === 0 && bottomIsBlock()) {
        commit('SET_GAME_OVER', true);
        console.log('GAME OVER :(');
        return;
      }

      commit('SET_SPAWN_LOCATION');
      commit('SET_CURRENT_CHAR');
      commit('SET_CURRENT_BLOCK');
      return;
    }
    commit('MOVE_DOWN');
    commit('CLEAR_LAST_BLOCK');
    commit('SET_CURRENT_BLOCK');
  },

  setGameOver({ commit }, status) {
    commit('SET_GAME_OVER', status);
  },

  resetGame({ commit }) {
    commit('CLEAR_BOARD');
    commit('RESET_GAME_STATE');
  },

  setIsGameRunning({ commit }, status) {
    commit('SET_IS_GAME_RUNNING', status);
  },

  increaseTime({ commit }) {
    commit('INCREASE_TIME');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

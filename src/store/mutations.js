import Vue from 'vue';
import charsBG from '../data/charactersBG';

// If in any situation failed to load charBG
// background color will falls back to this color!
const blockFallBackBGColor = '#616161';

export const SET_GAME_MODE = (state, mode) => {
  state.gameMode = mode;
};

export const SET_BOARD = (state) => {
  for (let i = 0; i < state.rows; i += 1) {
    state.board.push([]);
    for (let j = 0; j < state.cols; j += 1) {
      state.board[i][j] = {
        content: '',
        background: '',
      };
    }
  }
};

export const CLEAR_BOARD = (state) => {
  state.board = [];
};

export const SET_CURRENT_CHAR = (state, char) => {
  state.currentChar = char;
};

export const SET_NEXT_CHAR = (state, char) => {
  state.nextChar = char;
};

export const SET_ROWS = (state, num) => {
  state.rows = num;
};

export const SET_COLS = (state, num) => {
  state.cols = num;
};

export const SET_CURRENT_ROW = (state, index) => {
  state.currentRow = index;
};

export const SET_LAST_ROW = (state, index) => {
  state.lastRow = index;
};

export const SET_CURRENT_COL = (state, index) => {
  state.currentCol = index;
};

export const SET_LAST_COL = (state, index) => {
  state.lastCol = index;
};

export const SET_IS_GAME_RUNNING = (state, status) => {
  state.isGameRunning = status;
};

export const SET_GAME_OVER = (state, status) => {
  state.gameOver = status;
};

export const SET_CURRENT_BLOCK = (state) => {
  Vue.set(state.board[state.currentRow], state.currentCol, {
    content: state.currentChar,
    background: charsBG[state.currentChar] || blockFallBackBGColor,
  });
};

export const CLEAR_LAST_BLOCK = (state) => {
  Vue.set(state.board[state.lastRow], state.lastCol, {
    content: '',
    background: '',
  });
};

export const CLEAR_WORD_BLOCKS = (state, blocks) => {
  // Sort the blocks array by rowIndex increasingly
  // It's necessary for clearing column words
  blocks.sort((a, b) => a.row - b.row);

  // First clear the given blocks
  blocks.forEach((block) => {
    Vue.set(state.board[block.row], block.col, {
      content: '',
      background: '',
    });

    // Shift top blocks one block to bottom
    let upperBlock = block.row - 1;
    // if it's the top most row (No need for shift)
    if (upperBlock < 0) return;

    // Start replacing underneath block content with
    // top block
    while (state.board[upperBlock][block.col].content !== '') {
      const blk = state.board[upperBlock][block.col];

      Vue.set(state.board[upperBlock + 1], block.col, {
        content: blk.content,
        background: charsBG[blk.content] || blockFallBackBGColor,
      });

      upperBlock -= 1;

      if (
        // If column is full
        upperBlock < 0 ||
        // If upper block is empty!
        state.board[upperBlock][block.col].content === ''
      ) {
        Vue.set(state.board[upperBlock + 1], block.col, {
          content: '',
          background: '',
        });

        // Exit no need to recheck while condition
        return;
      }
    }
  });
};

export const SET_TIME = (state, payload) => {
  state.time.seconds = payload.seconds;
  state.time.minutes = payload.minutes;
};

export const INCREASE_TIME = (state) => {
  state.time.seconds += 1;

  if (state.time.seconds === 59) {
    state.time.seconds = 0;
    state.time.minutes += 1;
  }
};

export const DECREASE_TIME = (state) => {
  const s = state.time.seconds;
  const m = state.time.minutes;
  // If the time is invalid don't do any thing!
  if (s <= 0 && m <= 0) return;

  if (s === 0) {
    state.time.seconds = 60;
    state.time.minutes -= 1;
  }

  state.time.seconds -= 1;
};

export const SET_DARK_THEME = (state, status) => {
  if (typeof (status) !== 'boolean') return;
  state.darkTheme = status;
};

export const SET_SCORE_BOARD = (state, scores) => {
  if (!Array.isArray(scores)) return;
  state.scoreBoard = scores;
};

export const ADD_TO_SCORE_BOARD = (state, item) => {
  // Scoreboard items don't need to be reactive
  // so we simply push the new item
  state.scoreBoard.push(item);
};

export const SORT_AND_FIX_SCORE_BOARD = (state) => {
  state.scoreBoard = state.scoreBoard
    .sort((a, b) => {
      if (a.score > b.score) return -1;
      else if (a.score < b.score) return 1;

      if (a.time > b.time) return 1;
      else if (a.time < b.time) return -1;

      if (a.words > b.words) return 1;
      else if (a.words < b.words) return -1;

      return 0;
    })
    .slice(0, 10);
};

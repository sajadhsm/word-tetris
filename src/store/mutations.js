import Vue from 'vue';
import charsBG from '../data/charactersBG';

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
  // Work on this... Read reactivty of vuejs...
  // Must be a better way of doing this
  Vue.set(state.board[state.currentRow], state.currentCol, {
    content: state.currentChar,
    background: charsBG[state.currentChar] || 'orangered',
  });
};

export const CLEAR_LAST_BLOCK = (state) => {
  Vue.set(state.board[state.lastRow], state.lastCol, {
    content: '',
    background: '',
  });
};

export const CLEAR_WORD_BLOCKS = (state, blocks) => {
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

// Hit condition checks

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

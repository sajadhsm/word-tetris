<template>
  <div class="game-board">
    <div
      v-for="(row, i) in board"
      :key="i"
      class="row">

      <div
        v-for="(col, j) in row"
        :key="j"
        :style="{ background: col.background }"
        class="col">
        {{ col.content }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',
  computed: {
    board() {
      return this.$store.state.game.board;
    },
  },
};
</script>

<style scoped>
.game-board {
  padding: 5px;
  border-radius: 2px;
  border: 1px solid black;
  background: rgba(35, 85, 179, 0.438);
}
.row {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.row:last-child {
  margin: 0;
}
.col {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  border-radius: 2px;
  border: 1px solid #000;
}
.col:last-child {
  margin: 0;
}
</style>


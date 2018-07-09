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
.col {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid #000;
}
</style>


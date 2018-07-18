<template>
  <div class="game-board">
    <div
      v-for="(row, i) in board"
      :key="i"
      class="row">

      <div
        v-for="(col, j) in row"
        :key="j"
        class="col">

        <transition
          name="fade"
          mode="out-in">
          <div
            v-if="col.content !== ''"
            :style="{ background: col.background }"
            class="block">
            {{ col.content }}
          </div>
        </transition>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',

  computed: {
    board() {
      return this.$store.state.board;
    },
  },

  created() {
    this.$store.dispatch('setBoard');
  },

  destroyed() {
    this.$store.dispatch('clearBoard');
  },
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.row:last-child {
  margin: 0;
}
.col {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 42%;
  background: #ddd;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  overflow: hidden;
}
.col:last-child {
  margin: 0;
}

.block {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 42%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35);
}
</style>


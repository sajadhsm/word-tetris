<template>
  <div class="game-controls">
    <button
      class="button"
      @click="resetGame">
      <font-awesome-icon icon="redo"/>
    </button>

    <button
      v-if="!$store.state.isGameRunning"
      class="button"
      @click="startGame">
      <font-awesome-icon icon="play" />
    </button>

    <button
      v-else
      class="button"
      @click="pauseGame">
      <font-awesome-icon icon="pause" />
    </button>
  </div>
</template>

<script>
let timerInterval;
let gameLoopInterval;

export default {
  name: 'Controls',
  data() {
    return {
      newGame: true,
    };
  },
  methods: {
    startGame() {
      if (this.newGame) {
        this.newGame = false;
        this.$store.dispatch('freeMode/initialStart');
      }

      this.$store.dispatch('setIsGameRunning', true);

      timerInterval = setInterval(() => (
        this.$store.dispatch('increaseTime')
      ), 1000);

      gameLoopInterval = setInterval(() => {
        // Wrap it info function
        if (this.$store.state.gameOver) {
          this.newGame = true;
          this.$store.dispatch('setIsGameRunning', false);

          clearInterval(gameLoopInterval);
          clearInterval(timerInterval);

          this.$router.push('/gameover');
        }

        this.$store.dispatch('freeMode/moveDown');
      }, 500);
    },

    pauseGame() {
      this.$store.dispatch('setIsGameRunning', false);

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);
    },

    resetGame() {
      this.newGame = true;
      // SET_IS_GAME_RUNNING is commited in the resetGlobalState
      // Remove it later...
      this.$store.dispatch('setIsGameRunning', false);

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);

      this.$store.dispatch('resetGlobalStates');
      this.$store.dispatch('freeMode/resetStates');
      // Works as expected but maybe it's better to reset
      // excisting objects content rather than recreat and
      // pushing to the board ?
      this.$store.dispatch('clearBoard');
      this.$store.dispatch('setBoard');
    },
  },
};
</script>

<style scoped>
.game-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-basis: calc(100% / 3);
}
/* Create global class for buttons */
.game-controls button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.25rem;
  height: 3.25rem;
  background: #fff;
  border: 5px solid #ddd;
  border-radius: 43%;
  cursor: pointer;
  outline: none;
}
.game-controls button:last-child {
  margin-left: 0.75rem;
}
</style>

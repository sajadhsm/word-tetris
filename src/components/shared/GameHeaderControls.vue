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
  name: 'GameHeaderControls',
  data() {
    return {
      newGame: true,
    };
  },
  computed: {
    mode() {
      return this.$store.state.gameMode;
    },
  },
  methods: {
    endGame(status) {
      this.newGame = true;
      this.$store.dispatch('setIsGameRunning', false);
      this.$store.dispatch('setGameOver', true);

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);

      const name = status === 'win'
        ? 'level-win' : 'game-over';

      this.$router.push({ name });
    },
    startGame() {
      if (this.newGame) {
        this.newGame = false;
        this.$store.dispatch(`${this.mode}/initialStart`);
      }

      this.$store.dispatch('setIsGameRunning', true);

      timerInterval = setInterval(() => {
        if (this.mode === 'freeMode') {
          this.$store.dispatch('increaseTime');
        } else {
          if (
            !this.$store.state.time.seconds &&
            !this.$store.state.time.minutes
          ) {
            this.endGame('over');
          }
          this.$store.dispatch('decreaseTime');
        }
      }, 1000);

      gameLoopInterval = setInterval(() => {
        // Wrap it info function
        if (this.$store.state.levelMode.win) {
          this.endGame('win');
        }

        if (this.$store.state.gameOver) {
          this.endGame('over');
        }

        this.$store.dispatch(`${this.mode}/moveDown`);
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

      // NEED FIX: This will reset the time in level mode
      this.$store.dispatch('resetGlobalStates');
      this.$store.dispatch('levelMode/resetStates');
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

.button:last-child {
  margin-left: 0.75rem;
}
</style>

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
      gameSpeed: 750,
    };
  },

  computed: {
    mode() {
      return this.$store.state.gameMode;
    },
  },

  created() {
    // Sets gameSpeed according to gameMode
    this.gameSpeed = this.mode === 'levelMode' ?
      this.$store.getters['levelMode/levelSpeed']
      : 750;
  },

  beforeDestroy() {
    clearInterval(gameLoopInterval);
    clearInterval(timerInterval);
  },
  methods: {
    endGame(status) {
      this.newGame = true;
      this.$store.dispatch('setIsGameRunning', false);

      if (status === 'over') {
        this.$store.dispatch('setGameOver', true);
      }

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
          // Game over via running out of time only occurs
          // in the level mode
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
        if (this.$store.state.levelMode.win) {
          this.endGame('win');
        }

        if (this.$store.state.gameOver) {
          this.endGame('over');
        }

        this.$store.dispatch(`${this.mode}/moveDown`);

      // Block auto move speed is sat using interval delay
      }, this.gameSpeed);
    },

    pauseGame() {
      this.$store.dispatch('setIsGameRunning', false);

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);
    },

    resetGame() {
      this.newGame = true;

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);

      this.$store.dispatch('resetGlobalStates');
      this.$store.dispatch(`${this.mode}/resetStates`);

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

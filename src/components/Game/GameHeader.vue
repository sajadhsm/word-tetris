<template>
  <div> <!-- Wrapper for max-width fix -->
    <div class="game-header">
      <div class="game-info">
        <GameHeaderState :icon="'star'">
          {{ $store.state.game.score | toPersianNum }}
        </GameHeaderState>

        <GameHeaderState :icon="'clock'">
          {{ timer | toPersianNum }}
        </GameHeaderState>
      </div>

      <div class="next-block-container">
        <div class="next-block">
          <div
            style="{background-color: 'orangered'}"
            class="block">
            {{ $store.state.game.nextChar }}
          </div>
        </div>
      </div>

      <div class="game-controls">
        <button
          class="button"
          @click="resetGame">
          <font-awesome-icon icon="redo"/>
        </button>

        <button
          v-if="!$store.state.game.isGameRunning"
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
    </div>
  </div>
</template>

<script>
import GameHeaderState from './GameHeaderState.vue';

let timerInterval;
let gameLoopInterval;

export default {
  name: 'GameHeader',
  components: {
    GameHeaderState,
  },
  data() {
    return {
      seconds: 0,
      minutes: 0,
      newGame: true,
    };
  },
  computed: {
    timer() {
      const s = (this.seconds < 10) ? `0${this.seconds}` : this.seconds;
      const m = (this.minutes < 10) ? `0${this.minutes}` : this.minutes;

      return `${m}:${s}`;
    },
  },
  methods: {
    startGame() {
      if (this.newGame) {
        this.newGame = false;
        this.$store.dispatch('startGame');
      }

      this.$store.dispatch('setIsGameRunning', true);
      
      timerInterval = setInterval(() => {
        this.seconds += 1;

        if (this.seconds === 59) {
          this.seconds = 0;
          this.minutes += 1;
        }
      }, 1000);

      gameLoopInterval = setInterval(() => {
        // Wrap it info function
        if (this.$store.state.game.gameOver) {
          this.newGame = true;
          this.$store.dispatch('setIsGameRunning', false);
          clearInterval(gameLoopInterval);
          clearInterval(timerInterval);

          this.$store.dispatch('setTime', this.timer);
          this.$router.push('/gameover');
        }

        this.$store.dispatch('moveDown');
      }, 500);
    },

    pauseGame() {
      console.log('resume');
      this.$store.dispatch('setIsGameRunning', false);
      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);
    },

    resetGame() {
      this.newGame = true;
      this.$store.dispatch('setIsGameRunning', false);

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);

      this.seconds = 0;
      this.minutes = 0;

      this.$store.dispatch('resetGame');
    },
  },
};
</script>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-between;
  max-width: 768px;
  margin: 0 auto;
  padding: 1rem;
  background: rgba(5, 104, 170, 0.041);
}
.game-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: calc(100% / 3);
  padding: 0 5px;
  /* background: rgba(255, 47, 220, 0.137); */
}
/* Decrease GameHeaderStates spacing */
.game-info > p {
  margin: 0;
}
.game-info > p:not(:last-child) {
  margin-bottom: 0.5rem;
}
.next-block-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: calc(100% / 3);
}
/* Code dublication with .col */
.next-block {
  width: 4rem;
  height: 4rem;
  border-radius: 40%;
  background: #ddd;
  /* color: #fff; */
  font-size: 1.5em;
  font-weight: 700;
  overflow: hidden;
}
.game-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-basis: calc(100% / 3);
  /* background: rgba(137, 43, 226, 0.041); */
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

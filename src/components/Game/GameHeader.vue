<template>
  <div> <!-- Wrapper for max-width fix -->
    <div class="game-header">
      <div class="game-info">
        <p>امتیاز: {{ $store.state.game.score | toPersianNum }}</p>
        <p>تعداد کلمات: {{ $store.state.game.matchWords | toPersianNum }}</p>
        <p>زمان: {{ timer | toPersianNum }}</p>
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
        <!-- Need better conditions -->
        <!-- It's good game status buttons have diffrent colors -->
        <!-- Also use mapState to access store states -->
        <button
          v-if="newGame"
          class="button"
          @click="startNewGame">شروع</button>
        <button
          v-if="!newGame && $store.state.game.isGameRunning"
          class="button"
          @click="pauseGame">توقف</button>
        <button
          v-if="!newGame && !$store.state.game.isGameRunning"
          class="button"
          @click="resumeGame">ادامه</button>

        <button
          class="button"
          @click="resetGame">بازی جدید</button>

        <button class="button">تنظیمات</button>
      </div>
    </div>
  </div>
</template>

<script>
let timerInterval;
let gameLoopInterval;

export default {
  name: 'GameHeader',
  data() {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      newGame: true,
    };
  },
  computed: {
    timer() {
      const s = (this.seconds < 10) ? `0${this.seconds}` : this.seconds;
      const m = (this.minutes < 10) ? `0${this.minutes}` : this.minutes;
      const h = (this.hours < 10) ? `0${this.hours}` : this.hours;

      return `${h}:${m}:${s}`;
    },
  },
  // TODO: Most of code are repeated in some places
  //       Review and wrap them into functions
  methods: {
    startNewGame() {
      this.newGame = false;
      this.$store.dispatch('toggleIsGameRunning'); // false > true

      this.$store.dispatch('startGame');

      timerInterval = setInterval(() => {
        this.seconds += 1;

        if (this.seconds === 59) {
          this.seconds = 0;
          this.minutes += 1;

          if (this.minutes === 59) {
            this.minutes = 0;
            this.hours += 1;
          }
        }
      }, 1000);

      gameLoopInterval = setInterval(() => {
        // Wrap it info function
        if (this.$store.state.game.gameOver) {
          this.newGame = true;
          this.$store.dispatch('toggleIsGameRunning'); // true > false
          clearInterval(gameLoopInterval);
          clearInterval(timerInterval);
        }

        this.$store.dispatch('moveDown');
      }, 500);
    },

    pauseGame() {
      console.log('resume');
      this.$store.dispatch('toggleIsGameRunning'); // true > false
      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);
    },

    resumeGame() {
      this.$store.dispatch('toggleIsGameRunning'); // false > true

      timerInterval = setInterval(() => {
        this.seconds += 1;

        if (this.seconds === 59) {
          this.seconds = 0;
          this.minutes += 1;

          if (this.minutes === 59) {
            this.minutes = 0;
            this.hours += 1;
          }
        }
      }, 1000);

      gameLoopInterval = setInterval(() => {
        // Wrap it info function
        if (this.$store.state.game.gameOver) {
          this.newGame = true;
          this.$store.dispatch('toggleIsGameRunning'); // true > false
          clearInterval(gameLoopInterval);
          clearInterval(timerInterval);
        }

        this.$store.dispatch('moveDown');
      }, 500);
    },

    resetGame() {
      this.newGame = true;
      this.$store.dispatch('toggleIsGameRunning'); // true > false

      clearInterval(gameLoopInterval);
      clearInterval(timerInterval);

      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;

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
  flex-basis: calc(100% / 3);
  padding: 0 5px;
  /* background: greenyellow; */
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
  flex-direction: column;
  justify-content: space-between;
  flex-basis: calc(100% / 3);
  /* background: rgba(137, 43, 226, 0.103); */
}
.game-controls button {
  padding: 5px;
  background: #fff;
  border: 4px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
}
/* .game-controls button:first-child {
  margin-bottom: 5px;
} */
</style>

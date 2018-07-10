<template>
  <div class="game-header">
    <div class="game-info">
      <p>امتیاز: {{ $store.state.game.score | toPersianNum }}</p>
      <p>تعداد کلمات: {{ $store.state.game.matchWords | toPersianNum }}</p>
      <p>زمان: {{ timer | toPersianNum }}</p>
    </div>

    <div class="next-block-container">
      <div class="next-block">{{ $store.state.game.nextChar }}</div>
    </div>

    <div class="game-controls">
      <button
        class="button"
        @click="startGame">شروع</button>
      <button class="button">تنظیمات</button>
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
  methods: {
    startGame() {
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
        this.$store.dispatch('moveDown');
      }, 500);
    },
  },
};
</script>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-between;
  min-width: 350px;
  margin: 0 0 25px 0;
  padding: 5px;
  border-radius: 5px;
  background: rgba(5, 104, 170, 0.527);
  color: #fff;
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
.next-block {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 5px;
  font-size: 1.5em;
}
.game-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: calc(100% / 3);
  /* background: blueviolet; */
}
.game-controls button {
  background-color: deepskyblue;
  border-color: dodgerblue;
}
.game-controls button:first-child {
  margin-bottom: 5px;
}
</style>

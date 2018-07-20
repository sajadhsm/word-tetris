<template>
  <div class="game-over">
    <h1 class="title">
      {{ mode === 'freeMode' ?
        'بازی تموم شد!' :
        'موفق نشدی :('
      }}
    </h1>

    <div class="game-info">
      <Info
        v-if="mode === 'freeMode'"
        title="امتیاز">
        {{ $store.state.freeMode.score | toPersianNum }}
      </Info>

      <Info
        v-if="mode === 'freeMode'"
        title="تعداد کلمات">
        {{ $store.state.freeMode.matchWords | toPersianNum }}
      </Info>

      <Info
        v-if="mode === 'levelMode'"
        title="مرحله">
        {{ $store.getters['levelMode/currentLevelNatural'] | toPersianNum }}
      </Info>

      <Info title="زمان">
        {{ $store.getters.time | toPersianNum }}
      </Info>
    </div>

    <Controls />
  </div>
</template>

<script>
import GameOverInfo from '../shared/Info.vue';
import GameOverControls from './Controls.vue';

export default {
  name: 'GameOver',
  components: {
    Info: GameOverInfo,
    Controls: GameOverControls,
  },
  computed: {
    mode() {
      return this.$store.state.gameMode;
    },
  },

  created() {
    // Update scoreboard for freeMode
    if (this.mode === 'freeMode') {
      const summery = {
        score: this.$store.state.freeMode.score,
        time: this.$store.getters.time,
        words: this.$store.state.freeMode.matchWords,
      };

      this.$store.dispatch('updateScoreBoard', summery);
    }
  },
};
</script>

<style scoped>
.game-over {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
}

.title {
  padding: 1.5rem 1rem;
  direction: rtl;
}
</style>

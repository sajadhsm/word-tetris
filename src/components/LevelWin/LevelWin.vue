<template>
  <div class="game-over">
    <h1 class="title">عالی بود :)</h1>

    <div class="game-info">
      <Info title="جواب">
        {{ $store.getters['levelMode/levelWord'] | toPersianNum }}
      </Info>

      <Info title="مرحله">
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
  name: 'LevelWin',
  components: {
    Info: GameOverInfo,
    Controls: GameOverControls,
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

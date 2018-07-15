<template>
  <div class="game-over">
    <h1 class="title">بازی تموم شد!!</h1>

    <div class="game-info">
      <Info title="امتیاز">
        {{ $store.state.game.score | toPersianNum }}
      </Info>

      <Info title="تعداد کلمات">
        {{ $store.state.game.matchWords | toPersianNum }}
      </Info>

      <Info title="زمان">
        {{ $store.getters.time | toPersianNum }}
      </Info>
    </div>

    <Controls />
  </div>
</template>

<script>
import GameOverInfo from './Info.vue';
import GameOverControls from './Controls.vue';

export default {
  name: 'GameOver',
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

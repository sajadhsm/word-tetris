<template>
  <div class="game-info">
    <State :icon="'star'">
      {{ $store.state.freeMode.score | toPersianNum }}
    </State>

    <State :icon="'clock'">
      {{ $store.getters.time | toPersianNum }}
    </State>
  </div>
</template>

<script>
import State from './State.vue';

export default {
  name: 'States',
  components: {
    State,
  },
};
</script>

<style scoped>
.game-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: calc(100% / 3);
  padding: 0 5px;
}
/* Decrease GameHeaderStates spacing */
.game-info > p {
  margin: 0;
}
.game-info > p:not(:last-child) {
  margin-bottom: 0.5rem;
}
</style>

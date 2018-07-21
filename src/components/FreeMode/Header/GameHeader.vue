<template>
  <div> <!-- Wrapper for max-width fix -->
    <div class="game-header">
      <States />
      <NextBlock />
      <Controls />
    </div>

    <transition name="word-show">
      <div
        v-if="$store.state.freeMode.showWords"
        class="created-words">
        {{ $store.state.freeMode.showWords }}
      </div>
    </transition>
  </div>
</template>

<script>
import States from './States.vue';
import NextBlock from '../../shared/NextBlock.vue';
import GameHeaderControls from '../../shared/GameHeaderControls.vue';

export default {
  name: 'GameHeader',
  components: {
    States,
    NextBlock,
    Controls: GameHeaderControls,
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
}
.created-words {
  position: absolute;
  left: 50%;
  top: -5rem;
  transform: translateX(-50%);
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}
.word-show-leave-active {
  transition: all 1.5s;
}
.word-show-leave-to {
  position: absolute;
  left: 50%;
  top: 8rem;
  font-size: 4rem;
  font-weight: 700;
  transform: translateX(-50%);
  opacity: 0;
}
</style>

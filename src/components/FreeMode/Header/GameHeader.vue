<template>
  <div> <!-- Wrapper for max-width fix -->
    <div class="game-header">
      <States />
      <NextBlock />
      <Controls />
    </div>
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
</style>

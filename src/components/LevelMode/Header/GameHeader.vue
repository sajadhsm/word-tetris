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
import Controls from './Controls.vue';
import NextBlock from './NextBlock.vue';

export default {
  name: 'GameHeader',
  components: {
    States,
    Controls,
    NextBlock,
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

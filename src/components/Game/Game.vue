<template>
  <div class="game">
    <GameHeader />
    <GameBoard />
    <GameControls />
  </div>
</template>

<script>
import GameHeader from './GameHeader.vue';
import GameBoard from './GameBoard.vue';
import GameControls from './GameControls.vue';
import words from '../../data/words';

export default {
  name: 'Game',
  components: {
    GameHeader,
    GameBoard,
    GameControls,
  },
  created() {
    console.log('CREATED!');
    this.$store.commit('SET_WORDS', words);
    this.$store.commit('SET_CHARACTERS');
    this.$store.commit('SET_BOARD');
  },
  destroyed() {
    console.log('GAME Destroyed! Reset game states here :)');
    // TODO: Reset game state...!
  },
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

@media screen and (min-width: 768px) {
  .game {
    justify-content: center;
  }
}
</style>

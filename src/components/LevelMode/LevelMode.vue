<template>
  <div class="game">
    <GameHeader />
    <GameBoard />
    <GameControls />
  </div>
</template>

<script>
import GameHeader from './Header/GameHeader.vue';
import GameBoard from '../Game/GameBoard.vue';
import GameControls from '../Game/GameControls.vue';

import levels from '../../data/levels';

export default {
  name: 'LevelMode',

  components: {
    GameHeader,
    GameBoard,
    GameControls,
  },

  created() {
    this.$store.commit('levelMode/SET_LEVELS', levels);
    this.$store.commit('levelMode/SET_LEVEL_CHARACTERS');

    // Change the board size to fit the word length
    const wordLen = this.$store.getters['levelMode/levelWordLen'];
    this.$store.commit('SET_COLS', wordLen);
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
</style>

<template>
  <div class="game">
    <GameHeader />
    <GameBoard />
    <GameControls />
  </div>
</template>

<script>
import GameHeader from './Header/GameHeader.vue';
import GameBoard from '../shared/GameBoard.vue';
import GameControls from '../shared/GameControls.vue';
import words from '../../data/words';

export default {
  name: 'Game',

  components: {
    GameHeader,
    GameBoard,
    GameControls,
  },

  created() {
    // Reset states in case of redirection!
    this.$store.dispatch('resetGlobalStates');
    this.$store.dispatch('freeMode/resetStates');

    // Set words and characters only once in app life cycle
    if (!this.$store.state.freeMode.words.length) {
      this.$store.commit('freeMode/SET_WORDS', words);
      this.$store.commit('freeMode/SET_CHARACTERS');
    }

    // Reset the board size
    // Maybe other game modes have changed it!
    this.$store.commit('SET_COLS', 7);
    this.$store.commit('SET_ROWS', 7);
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

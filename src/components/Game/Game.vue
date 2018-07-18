<template>
  <div class="game">
    <GameHeader />
    <GameBoard />
    <GameControls />
  </div>
</template>

<script>
import GameHeader from './Header/GameHeader.vue';
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
    // Maybe set words and characters once in app component
    // Or no maybe we need to set words seprately for each game mode
    // for now keep it here but REMEMBER: It is called every time
    // and the call value is heavy (7000 words...)

    // NOTE: Currectly just works for the freeMode
    this.$store.commit('freeMode/SET_WORDS', words);
    this.$store.commit('freeMode/SET_CHARACTERS');

    // Quick fix for change between modes board size change bug
    // Use a better solution
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

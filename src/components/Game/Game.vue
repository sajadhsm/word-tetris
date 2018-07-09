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

export default {
  name: 'Game',
  components: {
    GameHeader,
    GameBoard,
    GameControls,
  },
  created() {
    console.log('CREATED!');
    this.$store.commit('SET_WORDS', [
      'آب',
      'سلام',
      // 'انسان',
      // 'دانشگاه',
      // 'فناورد',
      // 'مسابقه',
      // 'رابط',
      // 'جمله',
      // 'داستان',
    ]);
    this.$store.commit('SET_CHARACTERS');
    this.$store.commit('SET_BOARD');
  },
};
</script>


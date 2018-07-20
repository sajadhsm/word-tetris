<template>
  <div class="score-board">
    <Header />
    <Table />
  </div>
</template>

<script>
import Header from './Header.vue';
import Table from './Table.vue';

export default {
  name: 'ScoreBoard',
  components: {
    Header,
    Table,
  },
};
</script>

<style scoped>
.score-board {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  direction: rtl;
  min-height: 100vh;
}
</style>

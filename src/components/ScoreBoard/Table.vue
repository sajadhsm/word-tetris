<template>
  <div class="fill">

    <div class="table"> <!-- wrapper -->

      <div class="table-header">
        <span class="rank">رنک</span>
        <span class="score">امتیاز</span>
        <span class="time">زمان</span>
        <span class="words">کلمات</span>
      </div>

      <div
        v-for="(row, index) in scoreBoard"
        :key="index"
        class="table-row">
        <span class="rank">{{ index + 1 | toPersianNum }}</span>
        <span class="score">{{ row.score | toPersianNum }}</span>
        <span class="time">{{ row.time | toPersianNum }}</span>
        <span class="words">{{ row.words | toPersianNum }}</span>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Table',
  computed: {
    scoreBoard() {
      return this.$store.state.scoreBoard;
    },
  },
};
</script>

<style scoped>
.fill {
  display: flex;
  flex: 1;
}
.table {
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.table span {
  flex-basis: 25%;
}

.table > div {
  display: flex;
}

.table-header {
  padding: 1rem 0;
  border-bottom: 3px solid #666;
  font-weight: 700;
}
.table-row {
  padding: 0.75rem 0;
  border-bottom: 1px solid #666;
}
</style>

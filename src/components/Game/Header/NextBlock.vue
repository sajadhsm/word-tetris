<template>
  <div class="next-block-container">
    <div class="next-block">
      <div
        style="{background-color: 'orangered'}"
        class="block">
        {{ $store.state.game.nextChar }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NextBlock',
};
</script>

<style scoped>
.next-block-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: calc(100% / 3);
}
/* Code dublication with .col */
.next-block {
  width: 4rem;
  height: 4rem;
  border-radius: 40%;
  background: #ddd;
  /* color: #fff; */
  font-size: 1.5em;
  font-weight: 700;
  overflow: hidden;
}
</style>

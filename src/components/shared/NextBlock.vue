<template>
  <div class="next-block-container">
    <div class="next-block">
      <div
        :style="{backgroundColor: bgColor}"
        class="block">
        {{ $store.state.nextChar }}
      </div>
    </div>
  </div>
</template>

<script>
import charsBG from '../../data/charactersBG';

export default {
  name: 'NextBlock',

  computed: {
    bgColor() {
      return charsBG[this.$store.state.nextChar];
    },
  },
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
  background-color: #ddd;
  color: #fff;
  font-size: 1.75em;
  font-weight: 700;
  overflow: hidden;
}
</style>

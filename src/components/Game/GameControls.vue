<template>
  <div class="controls">
    <button @click="moveLeft">
      <font-awesome-icon
        icon="angle-left"
        size="2x"/>
    </button>

    <button @click="moveDown">
      <font-awesome-icon
        icon="angle-down"
        size="2x"/>
    </button>

    <button @click="moveRight">
      <font-awesome-icon
        icon="angle-right"
        size="2x"/>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GameControls',

  created() {
    window.addEventListener('keydown', this.moveBlock);
  },

  destroyed() {
    window.removeEventListener('keydown', this.moveBlock);
  },

  methods: {
    ...mapActions([
      'moveLeft',
      'moveRight',
      'moveDown',
    ]),

    moveBlock(event) {
      if (event.keyCode === 40) {
        this.moveDown();
      } else if (event.keyCode === 39) {
        this.moveRight();
      } else if (event.keyCode === 37) {
        this.moveLeft();
      }
    },
  },
};
</script>

<style scoped>
.controls {
  text-align: center;
  background: rgba(50, 47, 255, 0.041);
  padding: 1rem 0;
}

.controls button {
  width: 3rem;
  height: 3rem;
  margin: 0 1rem;
  background: #fff;
  border: 5px solid #ddd;
  border-radius: 43%;
  cursor: pointer;
  outline: none;
}
</style>

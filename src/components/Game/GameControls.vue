<template>
  <div class="controls">
    <button @click="moveLeft">@</button>
    <button @click="moveDown">@</button>
    <button @click="moveRight">@</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GameControls',
  // I think there is a better time to add keyDown listeners
  // IMPORTANT: Dont forget to remove listeners then switching to
  // other components
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {
        this.moveDown();
      } else if (e.keyCode === 39) {
        this.moveRight();
      } else if (e.keyCode === 37) {
        this.moveLeft();
      }
    });
  },
  methods: mapActions([
    'moveLeft',
    'moveRight',
    'moveDown',
  ]),
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

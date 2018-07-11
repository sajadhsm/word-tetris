<template>
  <div class="controls">
    <button @click="moveLeft">چپ</button>
    <button @click="moveDown">پایین</button>
    <button @click="moveRight">راست</button>
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
  padding: 25px 0 0 0;
}

.controls button {
  margin: 0 10px;
  padding: 5px 20px;
  background: tomato;
  color: #fff;
  border: 1px solid rgb(218, 83, 59);
  border-bottom-width: 5px;
  border-radius: 2px;
  cursor: pointer;
}
</style>

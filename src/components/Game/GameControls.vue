<template>
  <div class="controls">
    <button id="left-btn" @click="moveLeft">left</button>
    <button id="down-btn" @click="moveDown">down</button>
    <button id="right-btn" @click="moveRight">right</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'GameControls',
  methods: mapActions([
    'moveLeft',
    'moveRight',
    'moveDown',
  ])
};
</script>


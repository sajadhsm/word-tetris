<template>
  <div class="game-header">
    <p>Score: {{ $store.state.game.score }}</p>
    <button @click="startGame">Start</button>
    <p><span class="col">{{ $store.state.game.nextChar }}</span></p>
  </div>
</template>

<script>
export default {
  name: 'GameHeader',
  methods: {
    startGame() {
      this.$store.dispatch('startGame');
      const gameLoop = setInterval(() => {
        this.$store.dispatch('moveDown');
      }, 500);
    },
  },
};
</script>

<style scoped>
.game-header {
  margin: 0 0 25px 0;
}
.col {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid #000;
}
</style>

<template>
  <div class="controls">
    <button>
      <font-awesome-icon
        icon="list-ul"
        flip="horizontal"/>
    </button>

    <button @click="goToMainMenu">
      <font-awesome-icon icon="home" />
    </button>

    <button @click="replayGame">
      <font-awesome-icon icon="redo" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameOverControls',

  beforeDestroy() {
    this.$store.dispatch('setGameOver', false);
  },

  methods: {
    goToMainMenu() {
      this.$router.push('/');
    },
    replayGame() {
      this.$router.push('/game');
    },
  },
};
</script>

<style scoped>
.controls {
  padding: 1.5rem 1rem;
}

/* Use global button style */
.controls button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3.25rem;
  height: 3.25rem;
  font-size: 1.25rem;
  background: #fff;
  border: 5px solid #ddd;
  border-radius: 43%;
  cursor: pointer;
  outline: none;
}

.controls button:not(:last-of-type) {
  margin: 0 1rem 0 0;
}
</style>


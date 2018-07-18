<template>
  <div class="controls">
    <button @click="replayGame">
      <font-awesome-icon icon="redo" />
    </button>

    <button @click="goToMainMenu">
      <font-awesome-icon icon="home" />
    </button>

    <button @click="nextLevel">
      <font-awesome-icon icon="angle-double-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameOverControls',

  // Destroy is called after other component creation...
  // So should reset the state by methods to avoid
  // SET_TIME -> ZERO
  methods: {
    goToMainMenu() {
      this.$router.push('/');
      this.$store.dispatch('resetGlobalStates');
      this.$store.dispatch('levelMode/resetStates');
    },
    replayGame() {
      this.$router.push('/levelmode');
      this.$store.dispatch('resetGlobalStates');
      this.$store.dispatch('levelMode/resetStates');
    },
    nextLevel() {
      // NOTE: The level is updated just by this button
      // It should happens when the win component is created
      // then should find a way to be able to replay the same level
      // or select from previous levels!
      this.$store.dispatch('levelMode/nextLevel');
      localStorage.setItem('currentLevel', this.$store.state.levelMode.currentLevel);

      this.$router.push('/levelmode');

      this.$store.dispatch('resetGlobalStates');
      this.$store.dispatch('levelMode/resetStates');
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


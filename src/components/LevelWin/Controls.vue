<template>
  <div class="controls">
    <button
      class="button"
      @click="goToMainMenu">
      <font-awesome-icon icon="home" />
    </button>

    <button
      class="button"
      @click="nextLevel">
      <font-awesome-icon icon="angle-double-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameOverControls',

  beforeDestroy() {
    // Unlock nextLevel
    this.$store.dispatch('levelMode/nextLevel');
    localStorage.setItem('currentLevel', this.$store.state.levelMode.currentLevel);

    // Reset states in case of redirection
    this.$store.dispatch('resetGlobalStates');
    this.$store.dispatch('levelMode/resetStates');
  },

  methods: {
    goToMainMenu() {
      this.$router.push({ name: 'main-menu' });
    },
    nextLevel() {
      this.$router.push({ name: 'level-mode' });
    },
  },
};
</script>

<style scoped>
.controls {
  padding: 1.5rem 1rem;
}

.button {
  font-size: 1.25rem;
}

.button:not(:last-of-type) {
  margin: 0 1rem 0 0;
}
</style>


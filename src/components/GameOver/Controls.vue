<template>
  <div class="controls">
    <button class="button">
      <font-awesome-icon
        icon="list-ul"
        flip="horizontal"/>
    </button>

    <button
      class="button"
      @click="goToMainMenu">
      <font-awesome-icon icon="home" />
    </button>

    <button
      class="button"
      @click="replayGame">
      <font-awesome-icon icon="redo" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameOverControls',

  beforeDestroy() {
    this.$store.dispatch('resetGlobalStates');
    this.$store.dispatch('freeMode/resetStates');
  },

  methods: {
    goToMainMenu() {
      this.$router.push({ name: 'main-menu' });
    },
    replayGame() {
      this.$router.push({ name: 'free-mode' });
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


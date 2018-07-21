<template>
  <div class="controls">
    <button
      class="button"
      @click="goToScoreBoard">
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

  computed: {
    mode() {
      return this.$store.state.gameMode;
    },
  },

  beforeDestroy() {
    this.$store.dispatch('resetGlobalStates');
    this.$store.dispatch(`${this.mode}/resetStates`);
  },

  methods: {
    goToMainMenu() {
      this.$router.push({ name: 'main-menu' });
    },
    goToScoreBoard() {
      this.$router.push({ name: 'score-board' });
    },
    replayGame() {
      const name = {
        freeMode: 'free-mode',
        levelMode: 'level-mode',
      };
      this.$router.push({ name: name[this.mode] });
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


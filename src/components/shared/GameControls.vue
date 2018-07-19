<template>
  <div class="controls">
    <button
      class="button"
      @click="moveLeft">
      <font-awesome-icon
        icon="angle-left"
        size="2x"/>
    </button>

    <button
      class="button"
      @click="moveDown">
      <font-awesome-icon
        icon="angle-down"
        size="2x"/>
    </button>

    <button
      class="button"
      @click="moveRight">
      <font-awesome-icon
        icon="angle-right"
        size="2x"/>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameControls',

  computed: {
    // Will be used as a way to determine the current game mode
    nameSpace() {
      return this.$store.state.gameMode;
    },
  },

  created() {
    window.addEventListener('keydown', this.moveBlock);
  },

  destroyed() {
    window.removeEventListener('keydown', this.moveBlock);
  },

  methods: {
    // Call the current game mode block movement actions
    moveLeft() {
      this.$store.dispatch(`${this.nameSpace}/moveLeft`);
    },
    moveRight() {
      this.$store.dispatch(`${this.nameSpace}/moveRight`);
    },
    moveDown() {
      this.$store.dispatch(`${this.nameSpace}/moveDown`);
    },

    moveBlock(event) {
      if (event.keyCode === 40) { // Down arrow
        this.moveDown();
      } else if (event.keyCode === 39) { // Right arrow
        this.moveRight();
      } else if (event.keyCode === 37) { // Left arrow
        this.moveLeft();
      }
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.button {
  margin: 0 0.5rem;
}
</style>

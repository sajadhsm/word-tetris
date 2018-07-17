<template>
  <div class="game-mode-selector">
    <button @click="previousGameMode">
      <font-awesome-icon icon="angle-left" />
    </button>

    <span>
      {{ modePersianName }}
    </span>

    <button @click="nextGameMode">
      <font-awesome-icon icon="angle-right" />
    </button>
  </div>
</template>

<script>
const modesNameMap = {
  freeMode: 'معمولی',
  levelMode: 'مرحله‌ای',
};

export default {
  name: 'GameModeSelector',
  data() {
    return {
      index: 0,
      modes: [
        'freeMode',
        'levelMode',
      ],
    };
  },
  computed: {
    modePersianName() {
      return modesNameMap[this.$store.state.gameMode];
    },
  },
  methods: {
    nextGameMode() {
      this.index += 1;
      if (this.index >= this.modes.length) this.index = 0;

      this.$store.commit('SET_GAME_MODE', this.modes[this.index]);
    },
    previousGameMode() {
      this.index -= 1;
      if (this.index < 0) this.index = this.modes.length - 1;

      this.$store.commit('SET_GAME_MODE', this.modes[this.index]);
    },
  },
};
</script>


<style scoped>
.game-mode-selector {
  display: flex;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  margin-bottom: 10px;

  background: #fff;
  border: 5px solid #ddd;

  border-radius: 20px;

  font-weight: 700;
  font-size: 1.2rem;
  overflow: hidden;
}
span {
  flex-basis: 60%;
  text-align: center;
}

button {
  flex-basis: 20%;
  box-sizing: border-box;
  padding: 10px 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>

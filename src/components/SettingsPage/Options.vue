<template>
  <div class="fill">

    <div class="options">

      <div class="clear-options">
        <h3>حذف اطلاعات ذخیره‌شده</h3>

        <div class="option">
          <p class="title">اطلاعات حالت مرحله‌ای</p>
          <button
            :disabled="isLevelClear"
            class="button"
            @click="clearCurrentLevel">
            <font-awesome-icon
              icon="trash-alt"
              size="lg" />
          </button>
        </div>

        <div class="option">
          <p class="title">اطلاعات جدول امتیازات</p>
          <button
            :disabled="isScoreBoardClear"
            class="button"
            @click="clearScoreBoard">
            <font-awesome-icon
              icon="trash-alt"
              size="lg" />
          </button>
        </div>
      </div>

      <div class="theme-options">
        <h3>تغییرات ظاهری</h3>

        <div class="option">
          <p class="title">انتخاب تم بازی</p>
          <div class="buttons">
            <button
              class="button dark-btn"
              @click="setDarkTheme">
              <font-awesome-icon
                icon="moon"
                size="lg" />
            </button>

            <button
              class="button"
              @click="setLightTheme">
              <font-awesome-icon
                icon="sun"
                size="lg" />
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Options',

  data() {
    return {
      levelClear: false,
      scoreBoardClear: false,
    };
  },

  computed: {
    isLevelClear() {
      return this.levelClear;
    },

    isScoreBoardClear() {
      return this.scoreBoardClear;
    },
  },

  created() {
    // Set initial clear buttons disable status
    this.levelClear = localStorage
      .getItem('currentLevel') === null;

    this.scoreBoardClear = localStorage
      .getItem('scoreBoard') === null;
  },

  methods: {
    clearCurrentLevel() {
      localStorage.removeItem('currentLevel');
      this.$store.commit('levelMode/SET_CURRENT_LEVEL', 0);
      this.levelClear = true;
    },

    clearScoreBoard() {
      localStorage.removeItem('scoreBoard');
      this.$store.commit('SET_SCORE_BOARD', []);
      this.scoreBoardClear = true;
    },

    setLightTheme() {
      // Ignore setting same value
      if (!this.$store.state.darkTheme) return;

      this.$store.commit('SET_DARK_THEME', false);
      localStorage.setItem('darkTheme', false);
    },

    setDarkTheme() {
      // Ignore setting same value
      if (this.$store.state.darkTheme) return;

      this.$store.commit('SET_DARK_THEME', true);
      localStorage.setItem('darkTheme', true);
    },
  },
};
</script>

<style scoped>
.fill {
  display: flex;
  flex: 1;
}
.options {
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
.clear-options {
  margin-bottom: 2rem;
}
.clear-options .option {
  margin-bottom: 1rem;
}

.option {
  display: flex;
  justify-content: space-between;
}

.dark-btn {
  margin-left: 0.5rem;
}

.button {
  transition: opacity 0.23s;
}
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

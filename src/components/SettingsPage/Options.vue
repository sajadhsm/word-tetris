<template>
  <div class="options">
    <div class="option">
      <p class="title">پاک کردن اطلاعات حالت مرحله‌ای</p>
      <button
        :disabled="isCurrentLevel"
        @click="clearCurrentLevel">
        پاک کن
      </button>
    </div>

    <div class="option">
      <p class="title">انتخاب تم بازی</p>
      <div class="buttons">
        <button @click="setDarkTheme">تیره</button>
        <button @click="setLightTheme">روشن</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Options',

  computed: {
    isCurrentLevel() {
      return localStorage.getItem('currentLevel') === null;
    },
  },

  methods: {
    clearCurrentLevel() {
      localStorage.removeItem('currentLevel');
    },

    setLightTheme() {
      this.$store.commit('SET_DARK_THEME', false);
    },

    setDarkTheme() {
      this.$store.commit('SET_DARK_THEME', true);
    },
  },
};
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* fill the space under Header */
  flex: 1;
  /* background: goldenrod; */
}
</style>

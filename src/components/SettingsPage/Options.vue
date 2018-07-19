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
      console.log('LIGHT THEME');
    },

    setDarkTheme() {
      console.log('DARK THEME');
      // document.body.style.background = 'rgb(38, 40, 51)';
      // document.body.style.color = '#fff';
    },
  },
};
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* fill the space under Header */
  flex: 1;
  /* background: goldenrod; */
}
</style>

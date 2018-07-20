<template>
  <div
    id="app"
    :class="theme">
    <transition
      name="fade"
      mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    // Dynamic class for theme switch
    theme() {
      const isDark = this.$store.state.darkTheme;
      return isDark ? 'dark' : '';
    },
  },

  mounted() {
    // Load the theme from localStorage
    if (localStorage.getItem('darkTheme')) {
      try {
        const isDark = JSON.parse(localStorage.getItem('darkTheme'));
        this.$store.commit('SET_DARK_THEME', isDark);
      } catch (e) {
        localStorage.removeItem('darkTheme');
      }
    }
  },
};
</script>


<style>
/* Global styles */
@import './assets/css/fonts.css';
@import './assets/css/base.css';
@import './assets/css/media-queries.css';
</style>

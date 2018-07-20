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
};
</script>


<style>
/* Global styles */
@import './assets/css/fonts.css';
@import './assets/css/base.css';
@import './assets/css/media-queries.css';
</style>

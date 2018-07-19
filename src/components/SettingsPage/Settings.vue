<template>
  <div class="settings">
    <Header />
    <Options />
  </div>
</template>

<script>
import Header from './Header.vue';
import Options from './Options.vue';

export default {
  name: 'Settings',
  components: {
    Header,
    Options,
  },
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  direction: rtl;
  min-height: 100vh;
}
</style>

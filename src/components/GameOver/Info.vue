<template>
  <div>
    <p>{{ title }}</p>

    <h2>
      <slot />
    </h2>
  </div>
</template>

<script>
export default {
  name: 'GameOverInfo',
  props: {
    title: {
      default: 'عنوان',
      type: String,
    },
  },
};
</script>

<style scoped>
div:not(:last-of-type) {
  margin: 0 0 1rem;
}
p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
}
h2 {
  margin: 0;
  font-size: 3rem;
}
</style>

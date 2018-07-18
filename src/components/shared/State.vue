<template>
  <p>
    <font-awesome-icon
      :icon="icon"
      size="lg" />

    <span>
      <slot />
    </span>
  </p>
</template>

<script>
export default {
  name: 'State',
  props: {
    icon: {
      default: 'star',
      type: String,
    },
  },
};
</script>

<style scoped>
span {
  padding-left: .25rem;
  font-size: 1.25rem;
  font-weight: 700;
}
</style>


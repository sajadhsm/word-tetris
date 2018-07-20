<template>
  <div> <!-- wrapper -->
    <div class="header">
      <h1>تنظیمات</h1>
      <div>
        <router-link
          :to="{ name: 'main-menu' }"
          tag="button"
          class="button">
          <font-awesome-icon
            icon="angle-left"
            size="2x" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>

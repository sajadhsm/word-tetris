<template>
  <div class="main-menu">
    <h1>¯\_(ツ)_/¯</h1>

    <router-link
      :to="$store.state.gameMode"
      tag="button">شروع</router-link>

    <button>جدول امتیازات</button>

    <button>تنظیمات</button>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
};
</script>

<style scoped>
h1 {
  font-size: 2.8rem;
}

.main-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.main-menu button {
  min-width: 200px;
  padding: 10px 15px;
  margin-bottom: 10px;
  background: #fff;
  border: 5px solid #ddd;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
}
.main-menu button:last-child {
  margin: 0;
}
</style>

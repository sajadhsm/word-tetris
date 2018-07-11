<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Game Panel</router-link> |
      <a href="#!">Settings?</a>
    </div> -->

    <div class="game-container">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Shabnam', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

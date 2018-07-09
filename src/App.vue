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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.game-container {
  padding: 25px;
  background: rgb(0, 153, 255);
  border-radius: 8px;
  border: 1px solid rgb(0, 102, 133);
  border-bottom-width: 5px;
  box-shadow: 0 15px 10px -5px lightgray;
}
</style>

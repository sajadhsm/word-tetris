<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
@font-face {
  font-family: Shabnam;
  src: url('assets/fonts/Shabnam.eot');
  src: url('assets/fonts/Shabnam.eot?#iefix') format('embedded-opentype'),
       url('assets/fonts/Shabnam.woff') format('woff'),
       url('assets/fonts/Shabnam.ttf') format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: Shabnam;
  src: url('assets/fonts/Shabnam-Bold.eot');
  src: url('assets/fonts/Shabnam-Bold.eot?#iefix') format('embedded-opentype'),
       url('assets/fonts/Shabnam-Bold.woff') format('woff'),
       url('assets/fonts/Shabnam-Bold.ttf') format('truetype');
  font-weight: bold;
}

html {
  height: 100%;
}

body {
  font-family: 'Shabnam', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f9f9f9;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.23s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.25);
}

.col {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 1.05rem;
  background: #ddd;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  overflow: hidden;
}
.col:last-child {
  margin: 0;
}

.block {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35);
}

@media screen and (min-width: 768px) {
  html {
    font-size: 24px;
  }
}
</style>

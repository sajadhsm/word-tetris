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
/* Global styles */
@import './assets/css/fonts.css';
@import './assets/css/base.css';
@import './assets/css/media-queries.css';
</style>

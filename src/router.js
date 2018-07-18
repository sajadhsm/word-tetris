import Vue from 'vue';
import Router from 'vue-router';

import FreeMode from '@/components/FreeMode/FreeMode.vue';
import LevelMode from '@/components/LevelMode/LevelMode.vue';
import MainMenu from '@/components/MainMenu/MainMenu.vue';
import GameOver from '@/components/GameOver/GameOver.vue';
import LevelWin from '@/components/LevelWin/LevelWin.vue';

import store from './store/store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-menu',
      component: MainMenu,
    },
    {
      path: '/freemode',
      name: 'free-mode',
      component: FreeMode,
    },
    {
      path: '/levelmode',
      name: 'level-mode',
      component: LevelMode,
      beforeEnter(to, from, next) {
        // Force game mode change
        // Maybe a better solution?
        if (store.state.gameMode !== 'levelMode') {
          store.commit('SET_GAME_MODE', 'levelMode');
        }
        next();
      },
    },
    {
      path: '/levelwin',
      name: 'level-win',
      component: LevelWin,
      beforeEnter(to, from, next) {
        if (store.state.levelMode.win) next();
        else next('/');
      },
    },
    {
      path: '/gameover',
      name: 'game-over',
      component: GameOver,
      beforeEnter(to, from, next) {
        if (store.state.gameOver) next();
        else next('/');
      },
    },
    {
      path: '*', // 404 Handle (Back to main menu)
      component: MainMenu,
    },
  ],
});

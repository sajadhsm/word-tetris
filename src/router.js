import Vue from 'vue';
import Router from 'vue-router';

import Game from '@/components/Game/Game.vue';
import MainMenu from '@/components/Page/MainMenu.vue';
import GameOver from '@/components/GameOver/GameOver.vue';

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
      path: '/game',
      name: 'game-panel',
      component: Game,
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

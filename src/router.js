import Vue from 'vue';
import Router from 'vue-router';
import MainMenu from '@/components/Page/MainMenu.vue';
import GameView from './views/Game.vue';

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
      component: GameView,
    },
  ],
});

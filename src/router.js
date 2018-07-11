import Vue from 'vue';
import Router from 'vue-router';

import Game from '@/components/Game/Game.vue';
import MainMenu from '@/components/Page/MainMenu.vue';

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
  ],
});

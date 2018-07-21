import Vue from 'vue';
import Router from 'vue-router';

import FreeMode from '@/components/FreeMode/FreeMode.vue';
import LevelMode from '@/components/LevelMode/LevelMode.vue';
import MainMenu from '@/components/MainMenu/MainMenu.vue';
import GameOver from '@/components/GameOver/GameOver.vue';
import LevelWin from '@/components/LevelWin/LevelWin.vue';
import Settings from '@/components/SettingsPage/Settings.vue';
import ScoreBoard from '@/components/ScoreBoard/ScoreBoard.vue';

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
      beforeEnter(to, from, next) {
        // Force game mode change
        if (store.state.gameMode !== 'freeMode') {
          store.commit('SET_GAME_MODE', 'freeMode');
        }
        next();
      },
    },
    {
      path: '/levelmode',
      name: 'level-mode',
      component: LevelMode,
      beforeEnter(to, from, next) {
        // Force game mode change
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
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/scoreboard',
      name: 'score-board',
      component: ScoreBoard,
    },
    {
      path: '*', // 404 Handle (Back to main menu)
      component: MainMenu,
    },
  ],
});

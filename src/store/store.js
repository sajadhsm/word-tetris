import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

import freeMode from './modules/freeMode/freeMode';
import levelMode from './modules/levelMode/levelMode';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    freeMode,
    levelMode,
  },
});

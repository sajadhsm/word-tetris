import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleDown,
  faAngleLeft,
  faAngleRight,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

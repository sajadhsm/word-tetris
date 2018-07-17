import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
  faRedo,
  faStar,
  faClock,
  faHome,
  faListUl,
  faAngleDoubleRight,
  faTrophy,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
  faRedo,
  faStar,
  faClock,
  faHome,
  faListUl,
  faAngleDoubleRight,
  faTrophy,
  faStopwatch,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

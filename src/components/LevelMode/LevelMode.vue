<template>
  <div class="game">
    <div class="header-and-hint">
      <GameHeader />
      <Hint :level="$store.getters['levelMode/currentLevelObject']"/>
    </div>
    <GameBoard />
    <GameControls />
  </div>
</template>

<script>
import GameHeader from './Header/GameHeader.vue';
import GameBoard from '../shared/GameBoard.vue';
import GameControls from '../shared/GameControls.vue';
import Hint from './Hint/Hint.vue';

import levels from '../../data/levels';

export default {
  name: 'LevelMode',

  components: {
    GameHeader,
    GameBoard,
    GameControls,
    Hint,
  },

  created() {
    // Reset states in case of redirection!
    this.$store.dispatch('resetGlobalStates');
    this.$store.dispatch('levelMode/resetStates');

    // Load current level from local storage
    if (localStorage.getItem('currentLevel')) {
      try {
        const lvl = parseInt(localStorage.getItem('currentLevel'), 10);
        this.$store.commit('levelMode/SET_CURRENT_LEVEL', lvl);
      } catch (e) {
        localStorage.removeItem('currentLevel');
      }
    }

    // Set levels only once in app life cycle
    if (!this.$store.state.levelMode.levels.length) {
      this.$store.commit('levelMode/SET_LEVELS', levels);
    }

    this.$store.commit('levelMode/SET_LEVEL_CHARACTERS');

    // Change the board size to fit the word length
    const wordLen = this.$store.getters['levelMode/levelWordLen'];
    this.$store.commit('SET_COLS', wordLen);

    // Initial spawnLocation in the middle
    this.$store.dispatch('setSpawnLoacation');

    const levelTime = this.$store.getters['levelMode/levelTime'];
    this.$store.commit('SET_TIME', levelTime);
  },
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
</style>

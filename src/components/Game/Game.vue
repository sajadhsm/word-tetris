<template>
    <div class="game">
        <GameHeader />
        <GameBoard />
        <GameControls />
    </div>
</template>

<script>
import GameHeader from './GameHeader.vue';
import GameBoard from './GameBoard.vue';
import GameControls from './GameControls.vue';

export default {
    name: 'game',
    components: {
        GameHeader,
        GameBoard,
        GameControls
    }
}
</script>


<template>
  <div class="hint">
    <p v-if="level.type === 'idiom'">
      <span class="prefix">{{ level.hint.prefix }}</span>
      <span class="mystery"> {{ mysteryWord }} </span>
      <span class="sufix">{{ level.hint.sufix }}</span>
    </p>

    <p v-else-if="level.type === 'opposite'">
      <span>مخالف "{{ level.hint }}"</span>
    </p>

    <p v-else-if="level.type === 'synonym'">
      <span>مترادف "{{ level.hint }}"</span>
    </p>

    <p v-else>بدون راهنمایی</p>
  </div>
</template>

<script>

export default {
  name: 'Hint',
  props: {
    level: {
      default() {
        return {
          word: 'کلمه',
          type: 'نوع',
          hint: {
            prefix: 'پیشوند',
            sufix: 'پسوند',
          },
        };
      },
      type: Object,
    },
  },
  computed: {
    mysteryWord() {
      const wordLen = this.level.word.length;
      let mystery = '';
      for (let i = 0; i < wordLen; i += 1) {
        mystery += '.';
      }
      return mystery;
    },
  },
};
</script>

<style scoped>
.hint {
  font-size: 1.2rem;
  font-weight: 700;
  direction: rtl;
  text-align: center;
}
.mystery {
  opacity: 0.6;
}
</style>

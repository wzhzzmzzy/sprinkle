<template lang="pug">
div.display-block
  div {{ racerText }}
  div
    p {{ cursor }}
    p {{ passedText }}
    p {{ `${currentWord.passed}${currentWord.wrong}${currentWord.remain}` }}
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'display-block',
  setup () {
    const store = useStore();
    const inputText = computed(() => store.state.game.inputText);
    const racerText = computed(() => store.state.game.racerText);
    const cursor = inject('cursor');
    const currentWord = inject('currentWord');
    const passedText = inject('passedText');
    return {
      racerText,
      inputText,
      cursor,
      currentWord,
      passedText
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

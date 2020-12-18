<template lang="pug">
section#racer
  display-block
  input-block
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { SingleWord } from '@/types';
import DisplayBlock from './components/display-block/display-block.vue';
import InputBlock from './components/input-block/input-block.vue';
import { TYPE_RACER_STATUS } from '@/utils/constants';

export default defineComponent({
  name: 'racer',
  components: {
    DisplayBlock,
    InputBlock
  },
  async setup () {
    const store = useStore();
    const cursor = ref<number>(0);
    const passedText = ref<string>('');
    const currentWord = reactive<SingleWord>({
      passed: '',
      wrong: '',
      remain: ''
    });
    provide('cursor', cursor);
    provide('currentWord', currentWord);
    provide('passedText', passedText);
    const getNextWord: (text: string) => string = text => {
      let tempCursor = cursor.value;
      let nextWord = '';
      while (tempCursor < text.length && text[tempCursor] !== ' ') {
        nextWord += text[tempCursor];
        tempCursor += 1;
      }
      return nextWord;
    };
    store.watch(
      state => ({
        inputText: state.game.inputText,
        racerText: state.game.racerText
      }),
      (value, oldValue) => {
        debugger;
        const { inputText, racerText } = value;
        const { inputText: prevInput } = oldValue;
        cursor.value = passedText.value.length + inputText.length;
        const lastCharPos = cursor.value - 1;
        // clear input
        if (!inputText && !currentWord.passed && !currentWord.wrong) return;
        // delete char
        if (prevInput.length > inputText.length) {
          const word = `${currentWord.passed}${currentWord.wrong}${currentWord.remain}`;
          console.log(word);
          currentWord.wrong = '';
          if (!inputText) {
            currentWord.passed = '';
            currentWord.remain = word;
          } else {
            currentWord.passed = inputText;
            currentWord.remain = word.split(inputText)[1];
          }
        }
        if (!inputText) return;
        // game start
        if (lastCharPos === 0) {
          store.commit('game/updateFields', {
            racerStatus: TYPE_RACER_STATUS.RUNNING
          });
          currentWord.remain = getNextWord(racerText);
        }
        // type wrong char
        if (racerText[lastCharPos] !== inputText[inputText.length - 1]) {
          currentWord.wrong += racerText[lastCharPos];
          currentWord.remain = currentWord.remain.substring(1);
        } else {
          // game finished
          if (cursor.value === racerText.length) {
            store.commit('game/updateFields', {
              racerStatus: TYPE_RACER_STATUS.FINISH
            });
            return;
          }
          // type space
          if (racerText[lastCharPos] === ' ') {
            currentWord.passed = '';
            currentWord.wrong = '';
            currentWord.remain = getNextWord(racerText);
            passedText.value = passedText.value + inputText;
            store.commit('game/updateFields', {
              inputText: ''
            });
          } else {
            currentWord.passed += racerText[lastCharPos];
            currentWord.remain = currentWord.remain.substring(1);
          }
        }
      }
    );
    await store.dispatch('game/fetchRacerText');
    return {
      currentWord
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

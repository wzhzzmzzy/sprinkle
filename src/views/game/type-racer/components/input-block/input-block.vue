<template lang="pug">
textarea(ref="inputEl" :value="inputText" @input="inputSync" @paste.prevent)
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { useStore } from 'vuex';
import { SingleWord } from '@/types';

export default defineComponent({
  name: 'input-block',
  setup () {
    const store = useStore();
    const currentWord: SingleWord|undefined = inject('currentWord');
    const inputEl = ref<HTMLTextAreaElement|null>(null);
    const inputText = ref('');
    const inputSync = (e: InputEvent) => {
      if (currentWord?.wrong && e.data) {
        if (!inputEl.value) return;
        inputEl.value.value = inputText.value;
        return;
      }
      const newVal = (e.target as HTMLTextAreaElement).value;
      inputText.value = newVal;
      store.commit('game/updateFields', {
        inputText: newVal
      });
    };
    store.watch(state => state.game.inputText, value => {
      if (!inputEl.value) return;
      inputEl.value.value = value;
      inputText.value = value;
    });
    return {
      currentWord,
      inputText,
      inputEl,
      inputSync
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

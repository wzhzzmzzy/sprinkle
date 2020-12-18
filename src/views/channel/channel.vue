<template lang="pug">
div.shrink-card(ref="cardRef" @mousedown="startShrink")
</template>

<script lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'channel',
  setup () {
    const cardRef = ref<HTMLElement|null>(null);
    const startShrink = () => {
      console.log(cardRef.value);
    };
    return {
      cardRef,
      startShrink
    };
  }
});
</script>

<style lang="scss" src="./style.scss"></style>

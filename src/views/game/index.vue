<template lang="pug">
suspense
  router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'game'
});
</script>

<style lang="scss" src="./style.scss" />

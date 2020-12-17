<template lang="pug">
main-navbar
main(id="main-body")
  main-sidebar(class="is-hidden-touch")
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainSidebar from './components/sidebar/sidebar.vue';
import MainNavbar from './components/navbar/navbar.vue';

export default defineComponent({
  name: 'main-layout',
  components: { MainSidebar, MainNavbar }
});
</script>

<style lang="scss" src="./style.scss"></style>

<template lang="pug">
main-navbar
main(id="main-body")
  main-sidebar(class="is-hidden-touch")
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainSidebar from '@/components/main-sidebar/main-sidebar.vue';
import MainNavbar from '@/components/main-navbar/main-navbar.vue';

export default defineComponent({
  name: 'main-layout',
  components: { MainSidebar, MainNavbar }
});
</script>

<style lang="scss" src="./style.scss"></style>

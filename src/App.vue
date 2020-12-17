<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from './layout/main/main.vue';
import { initStoreToken } from './utils/auth';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout
  },
  setup () {
    initStoreToken();
  }
});

</script>

<style lang="scss">

</style>

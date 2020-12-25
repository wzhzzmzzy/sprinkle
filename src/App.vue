<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { initStoreToken } from '@/utils/auth';

export default defineComponent({
  name: 'App',
  setup () {
    initStoreToken();
  }
});

</script>

<style lang="scss">

</style>

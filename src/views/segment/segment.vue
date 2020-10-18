<template lang="pug">
main-layout
  editor
</template>

<script>
import Editor from '@/components/editor/editor';
import MainLayout from '@/layout/main/main.vue';

export default {
  name: 'Segment',
  components: {
    MainLayout,
    Editor
  }
};
</script>

<style scoped lang="scss" src="./style.scss">

</style>

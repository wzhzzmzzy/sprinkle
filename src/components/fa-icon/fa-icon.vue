<template>
  <span :class="{ 'icon': !panel, 'panel-icon': panel, 'is-left': left }">
    <i class="fas" :class="className"></i>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'fa-icon',
  props: {
    className: Array,
    left: {
      type: Boolean,
      default: false,
    },
    panel: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>

</style>

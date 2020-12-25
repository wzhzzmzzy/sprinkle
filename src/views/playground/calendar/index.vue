<template lang="pug">
calendar-mini
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarMini from '@/components/calendar-mini/index.vue';

export default defineComponent({
  name: 'calendar-page',
  components: { CalendarMini },
  setup () {
    return {};
  }
});
</script>

<style lang="scss" src="./style.scss" />

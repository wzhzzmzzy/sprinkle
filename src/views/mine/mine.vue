<template lang="pug">
div(class="container")
  nav(class="mine-tabs")
    div(class="tabs is-centered is-boxed")
      ul
        li(
          v-for="tab in TABS"
          :key="tab.route"
          :class="{ 'is-active': tab.route === route.name }"
        ): a(@click="switchTab(tab)")
          span(class="icon is-small")
            i(class="fas" :class="[tab.icon]")
          span {{ tab.title }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TabRoute } from '@/types';
import { TABS } from './constants';

export default defineComponent({
  name: 'Mine',
  setup () {
    const router = useRouter();
    const route = useRoute();
    const switchTab = (tab: TabRoute) => {
      router.push({
        name: tab.route
      });
    };
    return {
      route,
      TABS,
      switchTab
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

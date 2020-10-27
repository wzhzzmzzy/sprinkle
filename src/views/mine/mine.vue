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
  router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChannelRoute } from '@/types';
import { api } from '@/utils/request';
import { TABS } from './constants';

export default defineComponent({
  name: 'Mine',
  setup () {
    const router = useRouter();
    const route = useRoute();
    const switchTab = (tab: ChannelRoute) => {
      router.push({
        name: tab.route
      });
    };
    api.get('/health-check');
    return {
      route,
      TABS,
      switchTab
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

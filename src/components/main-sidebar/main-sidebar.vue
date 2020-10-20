<template lang="pug">
div(class="sidebar")
  aside(class="menu")
    template(v-for="channelList in CHANNEL_ROUTES")
      p(class="menu-label sidebar-list-name" @click="toggleSideList(channelList.key)")
        span(class="icon is-small")
          i(
            class="fas"
            :class="{'fa-plus': listExpendStatus[channelList.key], 'fa-minus': !listExpendStatus[channelList.key]}"
          )
        span {{ channelList.name }}
      ul(
        class="menu-list sidebar-list"
        :style="{ 'max-height': !listExpendStatus[channelList.key] ? `${channelList.children.length * 2}rem` : 0 }"
      )
        li(v-for="channel in channelList.children" :key="channel.name" @click="switchChannel(channel)")
          a(
            class="is-size-7"
            :class="{ 'is-active': currentChannelName === channel.name }"
          )
            | {{ channel.name }}
            span(
              class="tag is-danger is-normal is-rounded is-light ml-1"
              v-if="channel.tip"
            ) {{ channel.tip }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CHANNEL_ROUTES } from '@/utils/constants';
import { useExpendMenu } from '@/utils';

export default defineComponent({
  name: 'main-sidebar',
  setup () {
    return {
      CHANNEL_ROUTES,
      ...useExpendMenu()
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

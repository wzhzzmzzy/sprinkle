<template lang="pug">
nav(class="navbar is-light has-shadow is-fixed-top")
  div(class="navbar-brand")
    a(class="navbar-item" href="/") Ralph-NMB
    a(
      ref="burgerEl"
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      @click="toggleMobileNavbar"
    )
      span(aria-hidden="true")
      span(aria-hidden="true")
      span(aria-hidden="true")
  div(id="navbar-main" class="navbar-menu" ref="navbarEl")
    div(class="navbar-start is-hidden-desktop")
      template(v-for="channelList in CHANNEL_ROUTES")
        div(class="navbar-item is-size-7")
          span(class="icon is-small mr-1" @click="toggleSideList(channelList.key)")
            i(
              class="fas"
              :class="{'fa-plus': listExpendStatus[channelList.key], 'fa-minus': !listExpendStatus[channelList.key]}"
            )
          span {{ channelList.name }}
        ul(
          class="navbar-list"
          :style="{ 'max-height': !listExpendStatus[channelList.key] ? `${channelList.children.length * 2.2}rem` : 0 }"
        )
          li(
            class="navbar-item channel-item is-size-7 pl-4"
            :class="{ 'is-active': currentChannelName === channel.name }"
            v-for="channel in channelList.children"
            :key="channel.name"
            @click="switchChannel(channel)"
          )
            | {{ channel.name }}
            span(
              class="tag is-danger is-normal is-rounded is-light"
              style="margin-left: 5px"
              v-if="channel.tip"
            ) {{ channel.tip }}
    div(class="navbar-end")
      div(class="navbar-item")
        div(class="field")
          div(class="control")
            input(
              class="input is-small is-primary is-rounded"
              type="text"
              placeholder="输入关键词或串号"
            )
      div(class="navbar-item")
        div(class="buttons")
          button(class="button is-primary is-rounded is-small")
            span(class="icon is-small")
              i(class="fas fa-walking")
            span 登录
          button(class="button is-info is-rounded is-small")
            span(class="icon is-small")
              i(class="fas fa-edit")
            span 发串
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import { CHANNEL_ROUTES } from '@/utils/constants';
import { useExpendMenu } from '@/utils';

export default defineComponent({
  name: 'main-navbar',
  setup (props, context) {
    const burgerEl = ref<HTMLElement|null>(null);
    const navbarEl = ref<HTMLElement|null>(null);
    const toggleMobileNavbar = () => {
      // eslint-disable-next-line no-unused-expressions
      burgerEl.value?.classList.toggle('is-active');
      // eslint-disable-next-line no-unused-expressions
      navbarEl.value?.classList.toggle('is-active');
    };
    return {
      CHANNEL_ROUTES,
      burgerEl,
      navbarEl,
      toggleMobileNavbar,
      ...useExpendMenu()
    };
  }
});
</script>

<style lang="scss" src="./style.scss"/>

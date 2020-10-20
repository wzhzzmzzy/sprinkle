<template lang="pug">
nav(class="navbar has-shadow is-fixed-top")
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
        div(class="navbar-item is-size-7" @click="toggleSideList(channelList.key)")
          span(class="icon is-small mr-1")
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
      div(class="navbar-item" v-if="hasLogin")
        div(class="field has-addons")
          p(class="control")
            button(
              class="button is-small is-rounded is-light is-warning"
              @click="to('Mine')"
            )
              span(class="icon is-small")
                i(class="fas fa-cookie")
              span 账户
          p(class="control")
            button(class="button is-small is-rounded is-link is-light")
              span(class="icon is-small")
                i(class="fas fa-thumbtack")
              span 订阅
      div(class="navbar-item")
        div(class="buttons")
          button(
            v-if="!hasLogin"
            class="button is-primary is-rounded is-small"
            @click="handleLogin"
          )
            span(class="icon is-small")
              i(class="fas fa-walking")
            span 登录
          button(class="button is-info is-rounded is-small" @click="toggleEditorModal(true)")
            span(class="icon is-small")
              i(class="fas fa-edit")
            span 发串
login-modal
editor(:loading="loading.replySubmit" @submit="handleSubmitReply")
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { CHANNEL_ROUTES } from '@/utils/constants';
import { hasLogin, removeToken, setToken } from '@/utils/auth';
import { Draft } from '@/types';
import { useExpendMenu } from '@/utils';
import LoginModal from '@/components/login-modal/login-modal.vue';
import Editor from '@/components/editor/editor.vue';

interface LoadingStatus {
  replySubmit: boolean;
}

export default defineComponent({
  name: 'main-navbar',
  components: {
    LoginModal,
    Editor
  },
  setup () {
    const store = useStore();
    const router = useRouter();
    const burgerEl = ref<HTMLElement|null>(null);
    const navbarEl = ref<HTMLElement|null>(null);
    const loading = reactive<LoadingStatus>({
      replySubmit: false
    });
    const toggleEditorModal = (val: boolean) => {
      store.commit('toggleEditorModal', val);
    };
    const toggleMobileNavbar = () => {
      // eslint-disable-next-line no-unused-expressions
      burgerEl.value?.classList.toggle('is-active');
      // eslint-disable-next-line no-unused-expressions
      navbarEl.value?.classList.toggle('is-active');
    };
    const handleLogin = () => {
      store.commit('user/setToken', 'test-token');
      setToken('test-token');
    };
    const handleSwitchCookie = () => {
      store.commit('user/setToken', '');
      removeToken();
    };
    const handleSubmitReply = (content: Draft) => {
      loading.replySubmit = true;
      console.log(content);
      setTimeout(() => {
        toggleEditorModal(false);
        loading.replySubmit = false;
      }, 1000);
    };
    const to = (name: string, query: any = {}) => {
      return router.push({
        name,
        query
      });
    };
    return {
      CHANNEL_ROUTES,
      hasLogin: hasLogin(),
      loading,
      burgerEl,
      navbarEl,
      toggleEditorModal,
      toggleMobileNavbar,
      handleLogin,
      handleSwitchCookie,
      handleSubmitReply,
      to,
      ...useExpendMenu()
    };
  }
});
</script>

<style lang="scss" src="./style.scss"/>

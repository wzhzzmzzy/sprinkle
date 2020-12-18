<template lang="pug">
div(class="columns is-mobile")
  div(class="column is-5-tablet is-10-mobile is-offset-1 ")
    article(
      class="cookie-panel panel is-primary"
      :class="{ 'add-cookie': panelStatus.addCookie }"
    )
      p(class="panel-heading")
        span(class="mr-1") 饼干列表
        button(
          class="add-cookie-btn button is-rounded is-small is-primary"
          :class="{ 'active': panelStatus.addCookie }"
          @click="toggleAddCookie"
        )
          fa-icon(:className="['fa-plus']")
      a(
        v-if="!panelStatus.addCookie"
        class="cookie-item panel-block"
        :class="{ 'is-active': currentCookie === cookie }"
        v-for="cookie in cookies"
        :key="cookie"
        @click="switchCookie(cookie)"
      )
        fa-icon(:className="[currentCookie === cookie ? 'fa-grin-alt': '']" left panel)
        span(class="cookie-item-content")
          span(class="pt-1" :class="{ 'has-text-weight-semibold': currentCookie === cookie }") {{ cookie }}
          button(class="cancel-btn button is-rounded is-small is-white" @click="removeCookie(cookie)")
            fa-icon(:className="['fa-times']")
      div(v-else)
        div(class="panel-block")
          div(class="control has-icons-left")
            input(class="input" type="text" placeholder="填写饼干唯一代码")
            fa-icon(:className="['fa-envelope']" left)
        div(class="panel-block")
          button(class="button is-outlined is-link mr-2")
            fa-icon(:className="['fa-check']")
          button(class="button is-outlined is-success")
            fa-icon(:className="['fa-qrcode']")
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import FaIcon from '/@/components/fa-icon/fa-icon.vue';
import { useCookie } from '/@/utils';
import { ExpendStatus } from '/@/types';

export default defineComponent({
  name: 'my-cookies',
  components: { FaIcon },
  setup () {
    const panelStatus = reactive<ExpendStatus>({
      addCookie: false
    });
    const toggleAddCookie = () => {
      panelStatus.addCookie = !panelStatus.addCookie;
    };
    return {
      panelStatus,
      toggleAddCookie,
      ...useCookie(),
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

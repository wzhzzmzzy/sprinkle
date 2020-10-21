<template lang="pug">
div(class="columns is-mobile")
  div(class="column is-5-tablet is-10-mobile is-offset-1 ")
    article(class="cookie-panel panel is-primary")
      p(class="panel-heading") 饼干列表
      a(
        class="cookie-item panel-block"
        :class="{ 'is-active': userStore.currentCookie === cookie }"
        v-for="cookie in userStore.cookies"
        :key="cookie"
      )
        fa-icon(:className="[userStore.currentCookie === cookie ? 'fa-grin-alt': '']" left panel)
        span(class="cookie-item-content")
          span(class="pt-1" :class="{ 'has-text-weight-semibold': userStore.currentCookie === cookie }") {{ cookie }}
          button(class="cancel-btn button is-rounded is-small is-white")
            fa-icon(:className="['fa-times']")
            span {{ btnText.cancel }}
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import FaIcon from '@/components/fa-icon/fa-icon.vue';

export default defineComponent({
  name: 'my-cookies',
  components: {
    FaIcon
  },
  setup () {
    const store = useStore();
    const userStore = computed(() => store.state.user);
    const btnText = reactive({
      ok: '',
      cancel: ''
    });
    return {
      userStore,
      btnText
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

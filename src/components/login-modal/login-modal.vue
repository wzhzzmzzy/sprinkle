<template lang="pug">
div(class="modal")
  div(class="modal-background")
  div(class="modal-card")
    header(class="modal-card-head")
      p(class="modal-card-title") 用户登录
      button(class="delete" aria-label="close")
    section(class="modal-card-body")
    footer(class="modal-card-foot")
      button(class="button is-success") 登录
      button(class="button") 注册
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'login-modal'
});
</script>

<style lang="scss" src="./style.scss" />

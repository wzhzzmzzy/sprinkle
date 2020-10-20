<template lang="pug">
div(class="modal" :class="{ 'is-active': value }")
  div(class="modal-background")
  div(class="modal-card")
    header(class="modal-card-head")
      p(class="modal-card-title") {{ title }}
      button(class="delete" aria-label="close" @click="$emit('change', false)")
    section(class="modal-card-body")
      slot(name="content")
    footer(class="modal-card-foot")
      slot(name="left-btn")
        button(class="button is-success" v-if="leftBtn" @click="leftBtn.onClick") {{ leftBtn.text }}
      slot(name="right-btn")
        button(class="button" v-if="rightBtn" @click="rightBtn.onClick") {{ rightBtn.text }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ButtonProp {
  text: string;
  onClick: (e: Event) => never;
}

export default defineComponent({
  name: 'basic-modal',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    leftBtn: {
      type: Object as () => ButtonProp,
      required: false
    },
    rightBtn: {
      type: Object as () => ButtonProp,
      required: false
    }
  }
});
</script>

<style lang="scss" src="./style.scss" />

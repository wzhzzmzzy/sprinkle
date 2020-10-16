<template lang="pug">
div(class="editor-card")
  nav(class="editor-tools-bar level")
    div(class="level-left")
      div(class="level-item")
        div(class="field")
          div(class="control")
            div(class="select is-small")
              select(@change="handleSelectEmotion")
                option(
                  v-for="emotion in EMOTION_TEXTS"
                  :key="emotion"
                  :value="emotion"
                  :selected="emotion === RANDOM_EMOTION"
                ) {{ emotion }}
      div(class="level-item")
        div(class="field")
          div(class="file has-name is-small")
            label(class="file-label")
              input(class="file-input" type="file" name="resume")
              span(class="file-cta")
                span(class="file-icon")
                  i(class="fas fa-upload")
                span(class="file-label") 选择文件
              span(class="file-label")
            span(class="file-name")
    div(class="level-right")
      div(class="level-item")
        button(class="button is-small is-rounded is-white")
          span(class="editor-submit icon is-small" @click="handleSubmit")
            i(class="fas fa-lg fa-arrow-circle-right")
  div(class="field")
    div(class="control")
      textarea(
        class="textarea has-fixed-size"
        placeholder="e.g. Hello world"
        v-model="draft.content"
        @click="e => handleChange('content', e.target.value)"
      )
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import { random } from 'lodash';
import { Draft } from '@/types';
import { EMOTION_TEXTS } from './constants';

export default defineComponent({
  name: 'editor',
  setup (props, context) {
    const draft: Draft = reactive({
      title: '',
      email: '',
      content: '',
      image: ''
    });
    const RANDOM_EMOTION = EMOTION_TEXTS[random(0, EMOTION_TEXTS.length)];
    const handleSubmit = () => {
      context.emit('submit', draft);
    };
    const handleSelectEmotion = (e: Event) => {
      draft.content += (e.target as HTMLSelectElement).value;
    };
    const handleChange = (field: keyof Draft, value: string) => {
      draft[field] = value;
    };
    return {
      EMOTION_TEXTS,
      RANDOM_EMOTION,
      draft,
      handleSelectEmotion,
      handleSubmit,
      handleChange
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

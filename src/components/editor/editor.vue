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
              input(class="file-input" type="file" name="file" accept="image/*" @change="handleUpload")
              span(class="file-cta")
                span(class="file-icon")
                  i(class="fas fa-file-upload")
                span(class="file-label") 选择文件
              span(class="file-label")
            span(class="file-name") {{ draft.image && draft.image.name }}
    div(class="level-right")
      div(class="level-item")
        button(class="button is-small is-rounded is-white")
          span(class="editor-rules icon is-small" @click="handleSubmit")
            i(class="fas fa-lg fa-exclamation-circle")
      div(class="level-item")
        button(class="button is-small is-rounded is-white")
          span(class="editor-submit icon is-small" @click="handleSubmit")
            i(class="fas fa-lg fa-arrow-circle-right")
  div(class="field")
    p(class="control has-icons-left")
      input(class="input is-small" type="text" placeholder="没见过什么人写的标题")
      span(class="icon is-small is-left")
        i(class="fas fa-bell")
  div(class="field")
    div(class="control")
      textarea(
        class="textarea has-fixed-size"
        placeholder="发串前请先阅读版规"
        :value="draft.content"
        @input="e => handleInput(e.target.value)"
      )
      p(class="help" v-if="backup.hasOldDraft && !backup.readBackup")
        span(class="get-backup icon is-small" @click="readBackup")
          i(class="fas fa-sm fa-check")
        | 点击读取草稿：{{ backup.oldBackupTime.toLocaleString('zh-CN') }}
      p(class="help is-success" v-if="backup.hasBackup && backup.newBackupTime")
        | 草稿已备份：{{ backup.newBackupTime.toLocaleString('zh-CN') }}
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from 'vue';
import { random, pick } from 'lodash/fp';
import { debounce } from 'lodash';
import { Draft } from '@/types';
import { EMOTION_TEXTS, LOCAL_DRAFT_KEY } from './constants';

export default defineComponent({
  name: 'editor',
  setup (props, context) {
    const draft = reactive<Draft>({
      title: '',
      content: '',
      image: undefined
    });
    const backup = reactive<any>({
      hasBackup: false,
      newBackupTime: new Date(),
      hasOldDraft: false,
      oldDraft: null,
      oldBackupTime: undefined,
      readBackup: false
    });
    const pickDraft = pick(['title', 'content']);
    const RANDOM_EMOTION = EMOTION_TEXTS[random(0, EMOTION_TEXTS.length)];
    onMounted(() => {
      const draftString: any = window.localStorage.getItem(LOCAL_DRAFT_KEY);
      if (draftString) {
        backup.oldDraft = JSON.parse(draftString);
        backup.oldBackupTime = new Date(backup.oldDraft.time);
        backup.hasOldDraft = true;
      }
    });
    const handleSubmit = () => {
      context.emit('submit', draft);
    };
    const handleChangeDraft = (field: keyof Draft, value?: any) => {
      (draft[field] as any) = value;
    };
    const handleUpload = (e: Event) => {
      handleChangeDraft('image', (e.target as HTMLInputElement).files?.[0]);
    };
    const handleInput = debounce((e: string) => {
      handleChangeDraft('content', e);
      if (!backup.hasBackup) backup.hasBackup = true;
      backup.newBackupTime = new Date();
      window.localStorage.setItem(
        LOCAL_DRAFT_KEY,
        JSON.stringify({
          ...pickDraft(draft),
          time: backup.newBackupTime.valueOf()
        })
      );
    }, 1000, { leading: true, trailing: true });
    const handleSelectEmotion = (e: Event) => {
      handleInput(draft.content + (e.target as HTMLSelectElement).value);
    };
    const readBackup = () => {
      const oldDraft = pickDraft(backup.oldDraft);
      Object.keys(oldDraft).forEach(k => {
        if (oldDraft[k]) handleChangeDraft(k as keyof Draft, oldDraft[k]);
      });
    };
    return {
      EMOTION_TEXTS,
      RANDOM_EMOTION,
      draft,
      backup,
      readBackup,
      handleSelectEmotion,
      handleSubmit,
      handleChangeDraft,
      handleInput,
      handleUpload
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

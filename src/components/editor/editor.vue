<template lang="pug">
basic-modal(
  title="编辑回复"
  :value="editorVisible"
  @change="toggleEditorModal"
)
  template(v-slot:left-btn)
    button(class="button is-link" :class="{ 'is-loading': loading }" @click="handleSubmit") 发串
  template(v-slot:content)
    div(class="editor-card")
      div(class="editor-tools-bar")
        div(class="bar-left")
          div(class="field emotion-select"): div(class="control")
            div(class="select is-small")
              select(@change="handleSelectEmotion")
                option(
                  v-for="emotion in EMOTION_TEXTS"
                  :key="emotion"
                  :value="emotion"
                  :selected="emotion === RANDOM_EMOTION"
                ) {{ emotion }}
          div(class="field image-upload"): div(class="file is-small")
            label(class="file-label")
              input(
                class="file-input"
                type="file"
                name="file"
                accept="image/*"
                ref="uploadEl"
                @change="handleUpload"
              )
              span(class="file-cta")
                span(class="file-icon"): i(class="fas fa-file-upload")
                span(class="file-label"): span(class="image-name") {{ imageName }}
          button(
            class="button is-small is-rounded is-white"
            v-if="draft.image"
            @click="deleteImage"
          )
            span(class="upload-reset icon is-small")
              i(class="fas fa-lg fa-minus-circle")
        div(class="bar-right")
          button(class="button is-small is-rounded is-white"  @click="openRules")
            span(class="editor-rules icon is-small")
              i(class="fas fa-lg fa-exclamation-circle")
          button(
            class="button is-small is-rounded is-white is-hidden-touch"
            style="color: hsl(204, 86%, 53%)"
            @click="handleSubmit"
          )
            span(class="editor-submit icon is-small")
              i(class="fas fa-lg fa-arrow-circle-right")
      div(class="field"): p(class="control has-icons-left")
        input(
          class="input is-small"
          type="text"
          placeholder="没见过什么人写的标题"
          @input="e => handleInput('title', e.target.value)"
        )
        span(class="icon is-small is-left"): i(class="fas fa-bell")
      div(class="field"): div(class="control")
        textarea(
          class="textarea is-small"
          placeholder="发串前请先阅读版规"
          :value="draft.content"
          @input="e => handleInput('content', e.target.value)"
        )
        p(class="help" v-if="backup.hasOldDraft && !backup.readBackup")
          span(class="get-backup icon is-small" @click="readBackup")
            i(class="fas fa-sm fa-check")
          | 点击读取草稿：{{ backup.oldBackupTime.toLocaleString('zh-CN') }}
        p(class="help is-success" v-if="backup.hasBackup && backup.newBackupTime")
          | 草稿已备份：{{ backup.newBackupTime.toLocaleString('zh-CN') }}
      button(
        class="button is-small is-rounded is-link is-hidden-desktop"
        :class="{ 'is-loading': loading }"
        @click="handleSubmit"
      )
        span(class="editor-submit icon is-small")
          i(class="fas fa-lg fa-arrow-circle-right")
        span 发送
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { random, pick } from 'lodash/fp';
import { debounce } from 'lodash';
import { Draft } from '@/types';
import BasicModal from '@/components/basic-modal/basic-modal.vue';
import { EMOTION_TEXTS, LOCAL_DRAFT_KEY } from './constants';

export default defineComponent({
  name: 'editor',
  components: { BasicModal },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const store = useStore();
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
    const uploadEl = ref<HTMLInputElement|null>(null);
    const pickDraft = pick(['title', 'content']);
    const RANDOM_EMOTION = EMOTION_TEXTS[random(0, EMOTION_TEXTS.length)];
    onMounted(() => {
      const draftString: string|null = window.localStorage.getItem(LOCAL_DRAFT_KEY);
      if (draftString) {
        backup.oldDraft = JSON.parse(draftString);
        backup.oldBackupTime = new Date(backup.oldDraft.time);
        backup.hasOldDraft = true;
      }
    });
    const editorVisible = computed(() => store.state.global.editorVisible);
    const toggleEditorModal = (val: boolean) => store.commit('toggleEditorModal', val);
    const handleSubmit = () => {
      context.emit('submit', draft);
    };
    const openRules = () => {
      // TODO 打开版规页面
    };
    const handleChangeDraft = (field: keyof Draft, value?: any) => {
      (draft[field] as any) = value;
    };
    const imageName = computed(() => {
      return draft.image ? draft.image.name : '选择图片';
    });
    const handleUpload = () => {
      handleChangeDraft('image', uploadEl.value?.files?.[0]);
    };
    const deleteImage = () => {
      if (uploadEl.value) uploadEl.value.value = '';
      draft.image = undefined;
    };
    const handleInput = debounce((field: keyof Draft, e: string) => {
      handleChangeDraft(field, e);
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
      handleInput('content', draft.content + (e.target as HTMLSelectElement).value);
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
      uploadEl,
      imageName,
      editorVisible,
      toggleEditorModal,
      readBackup,
      handleSelectEmotion,
      handleSubmit,
      openRules,
      handleChangeDraft,
      handleInput,
      handleUpload,
      deleteImage
    };
  }
});
</script>

<style lang="scss" src="./style.scss" />

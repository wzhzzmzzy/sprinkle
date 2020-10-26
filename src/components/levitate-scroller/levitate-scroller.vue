<template lang="pug">
div.main-container(
  ref="mainContainer"
  @mousemove="setHover(true)"
  @mouseenter="setHover(true)"
  @mouseleave="setHover(false)"
)
  transition(name="fade")
    button.scrollbar-container(
      ref="scrollbarContainer"
      @wheel="e => {scrollContentContainerBy(e.deltaY);}"
      @click="handleBlankTrack"
      @mousedown="handleBlankTrack"
      @mouseup="handleBlankTrack"
      @mouseleave="handleBlankTrack"
      v-show="(isHold || isHover) && isShow"
    )
      button.scrollbar-item(
        ref="scrollbarItem"
        @click.stop
        @mousedown.stop="addBodyListener"
        @mouseup.stop="removeBodyListener"
        @mouseenter="handleBlankTrack"
      )
  div.content-container(ref="contentContainer")
    div(ref="contentItem")
      slot
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'levitate-scroller',
  props: {
    clickTrackEventType: {
      type: String,
      default: 'move'
    },
    trackColor: {
      type: Array,
      default: null
    },
    barColor: {
      type: Array,
      default: null
    },
    barWidth: {
      type: Number,
      default: 12
    },
    fixedWidth: {
      type: Number,
      default: 0
    },
    fixedHeight: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    type RefHTMLElement = HTMLElement | null;
    // 获取元素的定义
    const mainContainer = ref<RefHTMLElement>(null);
    const scrollbarContainer = ref<RefHTMLElement>(null);
    const scrollbarItem = ref<RefHTMLElement>(null);
    const contentContainer = ref<RefHTMLElement>(null);
    const contentItem = ref<RefHTMLElement>(null);
    // 点击持续滚动的计时器
    const scrollInterval = ref<number>(0);
    // 点击状态的定义
    const isHover = ref<boolean>(false);
    const isHold = ref<boolean>(false);
    const isShow = ref<boolean>(false);
    // 记录鼠标点击的相对坐标以实现拖曳
    const clickOffset = ref<number>(0);

    // 滚动配置相关
    interface MoveStep {
      readonly [propName: string]: number;
    }

    const moveStepOptions: MoveStep = { up: -1, down: 1 };

    const setHover = (target: boolean) => {
      isHover.value = target;
    };

    // 相对滚动内容区域方法
    const scrollContentContainerBy = (move: number) => {
      // eslint-disable-next-line no-unused-expressions
      contentContainer.value?.scrollBy(0, move);
    };

    // 绝对滚动内容区域方法
    const scrollContentContainer = (move: number, clickPointOffset?: number) => {
      let target;
      const offset = clickPointOffset || (scrollbarItem.value?.clientHeight || 0) / 2;
      if (move < offset) {
        target = 0;
      } else if (move > (contentContainer.value?.clientHeight || 0) - ((scrollbarItem.value?.clientHeight || 0) / 2) + offset) {
        target = (contentItem.value?.clientHeight || 0) - (contentContainer.value?.clientHeight || 0);
      } else {
        target = (move - offset) / (contentContainer.value?.clientHeight || 0) * (contentItem.value?.clientHeight || 0);
      }
      // eslint-disable-next-line no-unused-expressions
      contentContainer.value?.scroll(0, target);
    };

    // 上下滚动方法，用于添加监听
    const scrollOneStep = (moveType: string) => {
      // eslint-disable-next-line no-unused-expressions
      contentContainer.value?.scrollBy({ top: moveStepOptions[moveType] * 400, left: 0, behavior: 'smooth' });
    };

    // 点击空白轨道的处理方法
    function handleBlankTrack (e: MouseEvent) {
      if (e.type === 'click' && props.clickTrackEventType === 'jump') {
        scrollContentContainer(e.offsetY);
      } else if (e.type === 'mousedown' && props.clickTrackEventType === 'move') {
        if (e.offsetY + 6 < Number(scrollbarItem.value?.style.top.slice(0, -2))) {
          scrollInterval.value && clearInterval(scrollInterval.value);
          scrollInterval.value = setInterval(scrollOneStep.bind(null, 'up'), 300);
        } else {
          scrollInterval.value && clearInterval(scrollInterval.value);
          scrollInterval.value = setInterval(scrollOneStep.bind(null, 'down'), 300);
        }
      } else if ((e.type === 'mouseup' || e.type === 'mouseleave' || e.type === 'mouseenter') && props.clickTrackEventType === 'move') {
        scrollInterval.value && clearInterval(scrollInterval.value);
      }
    }

    // 移动scrollbar，用于添加监听
    const scrollScrollbar = () => {
      if (scrollbarItem.value) {
        scrollbarItem.value.style.top = (contentContainer.value?.scrollTop || 0) * ((mainContainer.value?.clientHeight || 0) / (contentItem.value?.clientHeight || 1)) + 'px';
      }
    };

    // 初始化滚动条长度及滚动位置
    const initScrollbar = () => {
      if (scrollbarItem.value) {
        scrollbarItem.value.style.height = Math.pow(contentContainer.value?.clientHeight || 0, 2) / (contentItem.value?.clientHeight || 1) + 'px';
        scrollScrollbar();
        isShow.value = (mainContainer.value?.clientHeight || 0) < (contentItem.value?.clientHeight || 0);
      }
    };

    // 添加&删除body的监听以实现拖曳
    const dragScrollbar = (e: MouseEvent) => {
      if (mainContainer.value) {
        scrollContentContainer(e.clientY - mainContainer.value.getBoundingClientRect().top, clickOffset.value);
      }
    };
    const removeBodyListener = () => {
      isHold.value = false;
      document.body.removeEventListener('mousemove', dragScrollbar);
      document.body.removeEventListener('mouseup', removeBodyListener);
    };
    const addBodyListener = (e: MouseEvent) => {
      isHold.value = true;
      clickOffset.value = e.offsetY;
      document.body.addEventListener('mousemove', dragScrollbar);
      document.body.addEventListener('mouseup', removeBodyListener);
    };

    // 设置颜色属性
    const setColor = (colorArray: Array<number>, type: string) => {
      const colorStr = 'rgba(' + (colorArray[0] || 0) + ', ' + (colorArray[1] || 0) + ',' + (colorArray[2] || 0) + ',' + (colorArray[3] || 0.5) + ')';
      type === 'track' && scrollbarContainer.value && (scrollbarContainer.value.style.backgroundColor = colorStr);
      type === 'bar' && scrollbarItem.value && (scrollbarItem.value.style.backgroundColor = colorStr);
    };
    // 设置滚动条宽度
    const setWidth = () => {
      if (scrollbarContainer.value && scrollbarItem.value) {
        scrollbarContainer.value.style.width = props.barWidth + 'px';
        scrollbarContainer.value.style.borderRadius = props.barWidth / 2 + 'px';
        scrollbarItem.value.style.width = props.barWidth + 'px';
        scrollbarItem.value.style.borderRadius = props.barWidth / 2 + 'px';
      }
    };
    // 设置容器尺寸
    const setContainerSize = () => {
      props.fixedWidth && mainContainer.value && (mainContainer.value.style.width = props.fixedWidth + 'px');
      props.fixedHeight && mainContainer.value && (mainContainer.value.style.height = props.fixedHeight + 'px');
    };

    const option = {
      childList: true, // 子节点的变动（新增、删除或者更改）
      attributes: true, // 属性的变动
      characterData: true, // 节点内容或节点文本的变动
      subtree: true, // 是否将观察器应用于该节点的所有后代节点
      attributeOldValue: false, // 观察 attributes 变动时，是否需要记录变动前的属性值
      characterDataOldValue: false // 观察 characterData 变动，是否需要记录变动前的值
    };
    const contentResize = new MutationObserver(initScrollbar);

    onMounted(() => {
      // eslint-disable-next-line no-unused-expressions
      contentContainer.value?.addEventListener('scroll', scrollScrollbar);
      setWidth();
      setContainerSize();
      initScrollbar();
      props.trackColor && setColor(props.trackColor as Array<number>, 'track');
      props.barColor && setColor(props.barColor as Array<number>, 'bar');
      if (contentItem.value) {
        contentResize.observe(contentItem.value, option);
      }
    });

    onUnmounted(() => {
      if (contentItem.value) {
        contentResize.disconnect();
      }
    });

    return {
      mainContainer,
      scrollbarContainer,
      scrollbarItem,
      contentContainer,
      contentItem,
      isHover,
      isHold,
      isShow,
      scrollContentContainerBy,
      handleBlankTrack,
      addBodyListener,
      removeBodyListener,
      setHover,
      console
    };
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  margin-top: 10px;
  position: relative;
  width: 100%;
  height: 100%;
  transition: opacity 200ms;
}

.scrollbar-container {
  margin: 0 5px 0 0;
  border-radius: 6px;
  padding: 0;
  height: 100%;
  width: 12px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  right: 0;
  border: none;
  transition: opacity 200ms;

  &:focus {
    outline: none;
  }
}

.scrollbar-item {
  left: 0;
  border: none;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0);
  position: absolute;
  padding: 0;
  border-radius: 6px;
  opacity: 0.3;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.6;
  }
}

.content-container {
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

</style>

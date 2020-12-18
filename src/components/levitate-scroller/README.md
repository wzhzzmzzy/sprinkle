# levitate-scroller
为了解决滚动条的显示与隐藏产生的dom变动问题而实现的简易悬浮式滚动条组件。
## Example
```vue
<template lang="pug">
div.test-container
  levitate-scroller()
    button(@click="testList.push(0)") Add +
    div(v-for="(val, index) in testList" :key="index" style="height: 100px;") count + {{ index }} +++++++++++++++++++++++++++
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import levitateScroller from '/@/components/levitate-scroller/levitate-scroller.vue';

export default defineComponent({
  name: 'channel',
  components: {
    levitateScroller
  },
  setup () {
    const testList = ref<number[]>(Array(2));
    return {
      testList
    };
  }
});
</script>

<style scoped>
.test-container {
  width: 300px;
  height: 600px;
}
</style>
```

## Usage
将你需要替换滚动条的内容放置在此组件的默认插槽中：
```vue
<levitate-scroller>
  <!--需要包装的内容元素-->
</levitate-scroller>
```
或者使用template来放置多个元素：
```vue
<levitate-scroller>
    <template>
      <!--需要包装的多个内容元素-->
    </template>
</levitate-scroller>
```
设定fixedWidth与fixedHeight来固定显示的容器大小（这两个属性可单独设置）：
```vue
<levitate-scroller
    :fixedWidth="300"
    :fixedWidth="800"
>
  <!--需要包装的内容元素-->
</levitate-scroller>
```
在不设定fixedWidth或fixedHeight属性的情况下，此组件会使用100%的属性值以填满外层容器，所以需要放置在不依赖内部元素计算长宽的元素中。
```vue
<div style="width: 300px; height: 800px;">
  <levitate-scroller>
    <!--需要包装的内容元素-->
  </levitate-scroller>
</div>
```
其他可设置的属性：
```vue
<levitate-scroller
    click-track-event-type="move"
    :fixed-height="300"
    :fixed-width="200"
    :bar-width="20"
    :track-color="[255, 0, 0, 0.2]"
    :bar-color="[0, 255, 0, 0.2]"
>
    <!--需要包装的内容元素-->
</levitate-scroller>
```
- click-track-event-type 设置点击轨道空白部分的移动逻辑，可能值是'move', 'jump'，默认为'move'。
  move模式下会持续滚动，jump模式下会直接转到点击位置。
- fixed-height 设置固定高度(px)
- fixed-width 设置固定宽度(px)
- bar-width 设置滚动条宽度(px)
- track-color 设置轨道颜色(rgba)
- bar-color 设置滚动条颜色(rgba)

*颜色相关的属性可不填写完整，未填写的参数默认为[0, 0, 0, 0.5]，如[255, 127]会作为[255, 127, 0, 0.5]来使用。

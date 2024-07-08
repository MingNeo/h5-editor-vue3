<script lang="ts" setup>
import Square from '../square/index.vue'
import Circle from '../circle/index.vue'
import Text from '../text/index.vue'
import DesignCompWrapper from './DesignCompWrapper.vue'
import type { ElementInfo } from '@/types'

const props = defineProps<{
  id: string
  isDesign: boolean
  data: ElementInfo
  elementInfo: Record<string, any>
  componentSelectedMap: Record<string, any>
}>()

// 注册组件
const currentComp = computed(() => ({
  square: Square,
  circle: Circle,
  text: Text,
}[props.data?.type]))

const currentComponentInfo = computed(() => {
  // 位置样式传给外层容器，内部样式传给组件
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { width, height, left, top, transform, ...innerStyle } = props.data.style || {}
  return { style: transformStyle(props.data.style || {}), innerStyle: transformStyle(innerStyle) }
})

const selected = computed(() => !!props.componentSelectedMap?.[props.id])
</script>

<template>
  <Component
    :is="isDesign ? DesignCompWrapper : 'div'" :id="id"
    :class="`design-element absolute mt-10 ${selected ? 'selected' : ''}`" :data="data"
    :data-id="id" :style="currentComponentInfo.style" v-bind="$attrs"
  >
    <div class="element-box w-full h-full">
      <slot>
        <Component :is="currentComp" :id="id" :is-active="selected" :comp-style="currentComponentInfo.innerStyle" :option="data.option" />
      </slot>
    </div>
  </Component>
</template>

<style lang="scss" scoped>
.design-element {
  &.selected {
    z-index: 999 !important;
  }
  &.selected:before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #59c4ff;
    z-index: -1;
  }

  .element-box :global(> div) {
    box-sizing: border-box;
  }
}
</style>

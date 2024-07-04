<script lang="ts" setup>
import ContextMenu from '@imengyu/vue3-context-menu'
import Moveable from 'vue3-moveable'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import type { ElementInfo } from '~/types'

const props = defineProps<{
  id: string
  data: ElementInfo
}>()

const pageStore = usePageStore()

function handleSelect() {
  pageStore.selectElement(props.id)
}

function handleContextmenu(e) {
  handleSelect()
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: '向上一层',
        onClick: () => pageStore.changeZIndex({ id: props.id, type: 'up' }),
      },
      {
        label: '向下一层',
        onClick: () => pageStore.changeZIndex({ id: props.id, type: 'down' }),
      },
      {
        label: '删除组件',
        onClick: () => pageStore.removeComponent(props.id),
      },
      {
        label: '顶层',
        onClick: () => pageStore.changeZIndex({ id: props.id, type: 'top' }),
      },
      {
        label: '底层',
        onClick: () => pageStore.changeZIndex({ id: props.id, type: 'bottom' }),
      },
      {
        label: '复制组件',
        onClick: () => pageStore.cloneComponent(props.id),
      },
    ],
  })
}

const updateInfoDebounce = useDebounceFn((info) => {
  pageStore.updateComponentInfo(info)
}, 100)

const targetRef = ref(null)
function handleDrag(e) {
  // 通过数据驱动会不跟手，先直接修改再更新数据
  e.target.style.left = `${e.left}px`
  e.target.style.top = `${e.top}px`
  updateInfoDebounce({ id: props.id, style: { left: e.left, top: e.top }, isAssign: true })
}
function handleResize(e) {
  // 通过数据驱动会不跟手，先直接修改尺寸再更新数据
  e.target.style.width = `${e.width}px`
  e.target.style.height = `${e.height}px`
  e.target.style.transform = e.drag.transform
  updateInfoDebounce({ id: props.id, style: { width: e.width, height: e.height, transform: e.drag.transform }, isAssign: true })
}
function handleRotate(e) {
  updateInfoDebounce({ id: props.id, style: { transform: e.drag.transform }, isAssign: true })
}
</script>

<template>
  <div ref="targetRef" class="design-design-comp-wrapper comp-target" :class="`comp-target-${id}`" v-bind="$attrs" @mousedown.stop="handleSelect" @contextmenu.prevent="handleContextmenu">
    <slot />
  </div>
  <Moveable
    v-if="!props.data?.option?.lock && pageStore.currCompId === id"
    class-name="moveable"
    :target="[`.comp-target-${id}`]"
    :draggable="!props.data?.option?.lock"
    :scalable="false"
    :origin-draggable="false"
    :resizable="!props.data?.option?.lock && pageStore.currCompId === id"
    :throttle-resize="1"
    :rotatable="!props.data?.option?.lock && pageStore.currCompId === id"
    @drag="handleDrag"
    @resize="handleResize"
    @rotate="handleRotate"
  />
</template>

<style lang="scss">
</style>

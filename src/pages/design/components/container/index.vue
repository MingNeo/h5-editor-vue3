<script setup lang="ts">
import BaseComponent from '../designComponents/baseComponent/index.vue'
import { PAGE_CANVAS_WIDTH } from '~/config/constants'

const props = defineProps<{
  isDesign: boolean
  pageMode?: string
}>()

const pageStore = usePageStore()

const pageStyle = computed(() => {
  const { width: pageWidth = PAGE_CANVAS_WIDTH, height: pageHeight = 500 } = pageStore.pageData.pageInfo?.style || {}

  const transStyle: Record<string, any> = {
    ...pageStore.pageData.pageInfo?.style,
    width: `${pageWidth}px`,
    height: `${pageHeight}px`,
    transformOrigin: '0 0',
  }
  if (!props.isDesign) {
    const { offsetWidth = 0 } = document.body
    let scale = !offsetWidth && !pageWidth ? (pageWidth / offsetWidth) : 1
    scale = Number.isNaN(scale) ? 1 : scale
    transStyle.transform = `scale(${scale})`
    transStyle.transformOrigin = '0 0'
    transStyle.overflowX = 'hidden'
  }
  return transStyle
})
</script>

<template>
  <div class="box-border" v-bind="$attrs">
    <section class="design-container relative" :style="pageStyle" @mousedown="pageStore.clearSelected">
      <BaseComponent
        v-for="id in pageStore.components"
        :id="id"
        :key="id"
        :data="pageStore.pageData.elements[id] || {}"
        :element-info="{ ...pageStore.pageData.pageInfo?.option, ...(pageStore.pageData.elements[id]?.option || {}) }"
        :component-selected-map="pageStore.componentSelectedMap"
        :is-design="isDesign"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
</style>

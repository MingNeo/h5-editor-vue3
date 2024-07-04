<route lang="yaml">
  meta:
    layout: blank
  </route>

<script lang="ts" setup>
import ViewPageContainer from '../components/container/index.vue'
import { useDataHistory } from '../composables/useDataHistory'
import DesignConfigPanel from './components/DesignConfigPanel.vue'
import LeftPanel from './components/LeftPanel.vue'

const query = useQuery()

const pageStore = usePageStore()

const { last, undo, redo, canUndo, canRedo } = useDataHistory()

function handleAdd(type: string) {
  pageStore.addComponent(type)
}

onMounted(() => {
  pageStore.initPage(query.value.pageId || 0)
})
</script>

<template>
  <div class="design-page-wrapper w-full h-[100vh] flex flex-col">
    <div class="control-bar w-full flex gap-[8px] bg-white shadow z-20 py-1 px-3">
      <icon-park-back class="cursor-pointer" :class="canUndo ? 'color-black' : 'color-[#eee]'" theme="outline" size="24" @click="canUndo && undo()" />
      <icon-park-next class="cursor-pointer" :class="canRedo ? 'color-black' : 'color-[#eee]'" theme="outline" size="24" @click="canRedo && redo()" />
      <el-button class="self-end" @click="pageStore.savePage">
        保存
      </el-button>
    </div>
    <div class="page-center flex-1 flex w-full h-full">
      <LeftPanel @add="handleAdd" />
      <div class="page-container w-full flex-1 overflow-scroll flex justify-center">
        <ViewPageContainer is-design :page-id="query.pageId" class="border border-solid border-blue" />
      </div>
      <DesignConfigPanel :curr-comp-id="pageStore.currCompId" class="right-panel w-75 min-w-75 h-full bg-white right-0 absolute right-0 z-2" :page-id="query.pageId" />
    </div>
  </div>
</template>

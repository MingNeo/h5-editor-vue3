<script lang="ts" setup>
import Material from './Material.vue'
import CoverageList from './CoverageList.vue'

const emit = defineEmits(['add'])

const pageStore = usePageStore()

const activeName = ref('material')

function handleAdd(type: string) {
  emit('add', type)
}

function handleRemove(id: string | number) {
  pageStore.removeComponent(id)
}
</script>

<template>
  <div class="left-design-panel absolute w-[300px] h-full bg-white z-2">
    <el-tabs v-model="activeName" tab-position="left" class="h-full">
      <el-tab-pane label="素材" name="material">
        <template #label>
          <icon-park-material theme="outline" size="24" fill="#333" />
        </template>
        <Material @add="handleAdd" />
      </el-tab-pane>
      <el-tab-pane label="图层" name="coverage">
        <template #label>
          <icon-park-layers theme="outline" size="24" fill="#333" />
        </template>
        <CoverageList :elements="pageStore.pageData.elements" @select="pageStore.selectElement" @remove="handleRemove" @toggle-lock="pageStore.toggleLockComponent" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

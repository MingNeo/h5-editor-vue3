<script lang="ts" setup>
import GlobalTab from './GlobalTab.vue'
import ComponentTab from './ComponentTab.vue'

const props = defineProps<{
  currCompId?: string | number
}>()

const activeName = ref('global')

watch(() => props.currCompId, (newVal) => {
  if (newVal)
    activeName.value = 'element'
  else
    activeName.value = 'global'
})
</script>

<template>
  <el-tabs v-model="activeName" v-bind="$attrs" class="box-border w-75 min-w-75 h-full bg-white px-5">
    <el-tab-pane name="global" label="页面配置">
      <GlobalTab />
    </el-tab-pane>
    <el-tab-pane name="element" label="组件配置">
      <ComponentTab />
    </el-tab-pane>
  </el-tabs>
</template>

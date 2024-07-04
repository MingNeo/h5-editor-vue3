<script lang="ts" setup>
const pageStore = usePageStore()

const formData = ref({
  style: { ...(pageStore.pageData?.elements?.[pageStore.currCompId]?.style || {}) },
  option: { ...(pageStore.pageData?.elements?.[pageStore.currCompId]?.option || {}) },
})
const styleFields = ref([
  {
    label: '背景色',
    name: 'backgroundColor',
    type: 'colorPicker',
  },
  {
    label: '宽度',
    name: 'width',
    type: 'number',
  },
  {
    label: '高度',
    name: 'height',
    type: 'number',
  },
])

watch(() => [pageStore.pageData?.elements?.[pageStore.currCompId]?.style, pageStore.pageData?.elements?.[pageStore.currCompId]?.option], ([newStyle, newOption]) => {
  formData.value.style = { ...(newStyle || {}) }
  formData.value.option = { ...(newOption || {}) }
})

function handleStyleChange(style: Record<string, any>) {
  pageStore.updateComponentInfo({
    id: pageStore.currCompId,
    style,
    option: formData.value.option,
  })
}
</script>

<template>
  <div class="h-full">
    <el-form :model="formData">
      <el-form-item label="ID">
        {{ pageStore.currCompId }}
      </el-form-item>
      <el-divider content-position="left">
        样式
      </el-divider>
      <CommonFormItemsBuilder v-model="formData.style" :name-prefix="['style']" :column="1" :fields="styleFields" @change="handleStyleChange" />
    </el-form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  compStyle: Record<string, any>
  option?: Record<string, any>
  isActive?: boolean
}>()

const isEdit = ref(false)

function handleDbclick() {
  console.log('1111')
  isEdit.value = true
}

watch(() => props.isActive, (val) => {
  if (!val)
    isEdit.value = false
})
</script>

<template>
  <div class="min-h-[100%]" :style="compStyle" :contenteditable="isEdit" @dblclick="handleDbclick">
    {{ option?.text }}
  </div>
</template>

<script lang="ts" setup>
const content = ref('这是一段测试文本哈哈哈哈哈哈哈哈哈')
</script>

<template>
  <div class="p-4">
    <common-editor v-model="content" />
  </div>
</template>

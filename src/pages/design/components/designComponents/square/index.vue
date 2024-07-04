<script lang="ts" setup>
defineProps<{
  id: string
  compStyle: Record<string, any>
}>()
</script>

<template>
  <div class="w-[100%] h-[100%]" :style="compStyle" />
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
const emit = defineEmits(['add'])
</script>

<template>
  <div class="flex justify-between flex-wrap p-6 gap-[20px]">
    <div class="w-15 h-15 bg-blue cursor-pointer" @click="emit('add', 'square')" />
    <div class="w-15 h-15 bg-blue cursor-pointer rounded-[50%]" @click="emit('add', 'circle')" />
    <div class="w-15 h-15 bg-blue cursor-pointer flex justify-center items-center" @click="emit('add', 'text')">
      文字
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  elements: Record<string, any>
}>()

const emit = defineEmits(['remove', 'select', 'toggleLock'])

const pageStore = usePageStore()

function getCoverageName(type: string) {
  switch (type) {
    case 'text':
      return '文字'
    case 'circle':
      return '圆形'
    case 'square':
      return '方形'
  }
}

function handleRemove(id: string | number) {
  emit('remove', id)
}

function handleLock(id: string | number) {
  emit('toggleLock', id)
}
</script>

<template>
  <ul class="p-0 pr-2 flex flex-col">
    <li
      v-for="item in elements" :key="item.id"
      class="flex group transition-all cursor-pointer border border-solid border-[#eee] hover:border-[#333] mb-2 py-2 px-2 rounded-1"
      :class="{ '!border-[#333]': pageStore.currCompId === item.id }"
      @click="emit('select', item.id)"
    >
      <div class="flex-1 truncate">
        {{ item.lock }} {{ getCoverageName(item.type) }} {{ item.id }}
      </div>
      <div class="icons flex gap-[4px]">
        <icon-park-delete class="hidden group-hover:block" theme="outline" size="20" fill="#333" @click.stop="handleRemove(item.id)" />
        <icon-park-lock v-if="!item.option?.lock" class="hidden group-hover:block" theme="outline" size="20" fill="#333" @click.stop="handleLock(item.id)" />
        <icon-park-unlock v-else class="hidden group-hover:block" theme="outline" size="20" fill="#333" @click.stop="handleLock(item.id)" />
      </div>
    </li>
  </ul>
</template>

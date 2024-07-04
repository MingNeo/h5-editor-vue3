// 一个vue3 hooks，自动保存/存储到localStorage/自动格式化
// TODO: 根据pageId存储
export function useSave<T extends Record<string, any>>() {
  const savedValue = useStorage('design-page', {} as T)

  const status = ref<'' | 'saving' | 'saved'>('')

  // const timer = ref<number | NodeJS.Timeout>()
  // function delay(ms: number) {
  //   clearTimeout(timer.value)
  //   return new Promise((resolve) => {
  //     timer.value = setTimeout(resolve, ms)
  //   })
  // }

  const handleSave = useDebounceFn(async (value: T) => {
    // status.value = 'saving'
    savedValue.value = value
    // delay(200).then(() => { status.value = 'saved' })
    // delay(2000).then(() => { status.value = '' })
  }, 2000)

  const savedData = computed({
    get() {
      return savedValue.value
    },
    set(value: T) {
      handleSave(value)
    },
  })

  // onUnmounted(() => {
  //   clearTimeout(timer.value)
  // })

  return { savedData, status }
}

import { timestamp } from '@vueuse/shared'

export interface HistoryRecord {
  snapshot: string
  timestamp: number
}

export interface UseDataHistoryReturn {
  history: Ref<HistoryRecord[]>
  last: Ref<HistoryRecord>
  undoStack: Ref<HistoryRecord[]>
  redoStack: Ref<HistoryRecord[]>
  canUndo: Ref<boolean>
  canRedo: Ref<boolean>
  undo: () => void
  redo: () => void
  clear: () => void
  commit: () => void
  reset: () => void
}

/**
 * 使用手动引用历史记录的自定义组合函数。
 */
export function useDataHistory(options: { maxLength?: number } = {}): UseDataHistoryReturn {
  const pageStore = usePageStore()

  function _createHistoryRecord() {
    // 返回不被代理的对象
    return markRaw({
      snapshot: JSON.stringify(pageStore.pageData),
      timestamp: timestamp(),
    }) as HistoryRecord
  }

  const last = ref<HistoryRecord>(_createHistoryRecord())

  const undoStack = ref<HistoryRecord[]>([])
  const redoStack = ref<HistoryRecord[]>([])

  const _updatePageData = (record: HistoryRecord) => {
    pageStore.setPageData(JSON.parse(record.snapshot))
    pageStore.clearSelected()
    last.value = record
  }

  const commit = () => {
    undoStack.value.unshift(last.value)
    last.value = _createHistoryRecord()

    if (options.maxLength && undoStack.value.length > options.maxLength)
      undoStack.value.splice(options.maxLength, Number.POSITIVE_INFINITY)
    if (redoStack.value.length)
      redoStack.value.splice(0, redoStack.value.length)
  }

  const clear = () => {
    undoStack.value.splice(0, undoStack.value.length)
    redoStack.value.splice(0, redoStack.value.length)
  }

  const undo = () => {
    const state = undoStack.value.shift()

    if (state) {
      redoStack.value.unshift(last.value)
      _updatePageData(state)
    }
  }

  const redo = () => {
    const state = redoStack.value.shift()

    if (state) {
      undoStack.value.unshift(last.value)
      _updatePageData(state)
    }
  }

  const reset = () => {
    _updatePageData(last.value)
  }

  watch(() => pageStore.pageData, (val) => {
    if (JSON.stringify(val) !== last.value.snapshot)
      commit()
  }, { deep: true })

  const history = computed(() => [last.value, ...undoStack.value])
  const canUndo = computed(() => undoStack.value.length > 1)
  const canRedo = computed(() => redoStack.value.length > 0)

  return {
    undoStack,
    redoStack,
    last,
    history,
    canUndo,
    canRedo,

    clear,
    commit,
    reset,
    undo,
    redo,
  }
}

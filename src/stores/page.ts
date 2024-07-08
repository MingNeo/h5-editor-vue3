import { acceptHMRUpdate, defineStore } from 'pinia'
// import {
//   fetchPageData,
//   savePageData,
// } from '@/api/page'
import type { PageData } from '@/types'
import { getComponentDefaultInfo } from '@/pages/design/helper'

export const usePageStore = defineStore('page', () => {
  const pageData = ref<PageData>({ pageInfo: { style: {}, option: {} }, elements: {} })
  const components = computed(() => Object.values(pageData.value.elements || {})?.map(v => v.id))
  const componentSelectedMap = ref<Record<string, any>>({})
  const currCompId = ref()

  const { savedData } = useSave()

  function initPage(pageId: string | number) {
    getPageData(pageId)
  }

  // 更新页面配置
  function setPageData(newPageData: Partial<PageData>, merge: boolean = true) {
    const oldPageInfo = merge ? pageData.value.pageInfo : { style: {}, option: {} }
    pageData.value = {
      pageInfo: {
        style: { ...oldPageInfo.style, ...newPageData?.pageInfo?.style },
        option: { ...oldPageInfo.option, ...newPageData?.pageInfo?.option },
      },
      elements: newPageData?.elements || pageData.value.elements,
    }
    savedData.value = pageData.value
  }

  function getNewId() {
    return `localId-${uuid()}`
  }

  // 新增空白组件
  function addComponent(type: string) {
    const id = getNewId()
    const defaultInfo = getComponentDefaultInfo({ type })
    const style = {
      ...defaultInfo?.style,
      left: 0,
      top: 0,
      zIndex: Object.values(pageData.value.elements || {}).length + 1,
    }
    pageData.value.elements[id] = { id, type, style, option: defaultInfo?.option }
  }

  // 删除组件
  function removeComponent(id: string | number) {
    delete pageData.value.elements[id]
    delete componentSelectedMap.value[id]
  }

  // 克隆组件
  function cloneComponent(id: string | number) {
    const newId = getNewId()
    const old = pageData.value.elements[id]
    pageData.value.elements[newId] = {
      id: newId,
      type: old.type,
      style: {
        ...old.style,
        top: (old.style?.top || 0) + 15,
        left: (old.style?.left || 0) + 15,
        zIndex: Object.values(pageData.value.elements || {}).length + 1,
      },
      option: pageData.value.elements[id]?.option,
    }
  }

  // 更新样式
  function updateComponentInfo({ id, style, option, isAssign = true }: {
    id: any
    style?: Record<string, any>
    option?: Record<string, any>
    isAssign?: boolean
  }) {
    if (!id)
      return console.error('id is required')
    if (style)
      pageData.value.elements[id].style = isAssign ? { ...pageData.value.elements[id].style, ...style } : style
    if (option)
      pageData.value.elements[id].option = isAssign ? { ...pageData.value.elements[id].option, ...option } : option
  }

  // 更新组件选中状态
  function selectElement(id: string | number) {
    componentSelectedMap.value = { [id]: true }
    currCompId.value = id
  }

  // 更新组件选中状态
  function toggleLockComponent(id: string | number) {
    const currentItem = pageData.value.elements[id]
    if (!currentItem?.option)
      return
    currentItem.option.lock = !currentItem.option.lock
  }

  // 清除组件选中状态
  function clearSelected() {
    componentSelectedMap.value = {}
    currCompId.value = undefined
  }

  // 更新层级
  function changeZIndex({ id, type }: { type: 'up' | 'down' | 'top' | 'bottom', id: string }) {
    id = String(id)
    // 排序之前先按zIndex大小顺序重新生成 zIndex
    Object.entries(pageData.value.elements)
      .map(([key, v]) => [key, { ...v.style, zIndex: Number.parseInt(v.style.zIndex || 0, 10) }])
      .sort(([, style1], [, style2]) => style1.zIndex - style2.zIndex)
      .forEach(([key, styles], i) => {
        pageData.value.elements[key].style = { ...styles, zIndex: i + 1 }
      })

    const currentStyle = pageData.value.elements[id].style || {}
    const currentIndex = Number.parseInt(currentStyle.zIndex, 10)
    const elementList = Object.entries(pageData.value.elements)
    const max = elementList.length
    elementList.forEach(([_id, v]) => {
      let zIndex = Number.parseInt(v.style.zIndex || 0, 10)
      if (id === _id)
        zIndex = { up: zIndex + 1, down: zIndex - 1, top: max, bottom: 0 }[type]
      else if (['up', 'top'].includes(type))
        zIndex = zIndex === currentIndex + 1 ? currentIndex : zIndex > currentIndex + 1 ? zIndex - 1 : zIndex
      else if (['down', 'bottom'].includes(type) && zIndex === currentIndex - 1)
        zIndex = zIndex === currentIndex - 1 ? currentIndex : zIndex < currentIndex - 1 ? zIndex + 1 : zIndex

      if (zIndex > max)
        zIndex = max

      pageData.value.elements[_id].style = { ...v.style, zIndex }
    })
  }

  // 获取当前页面配置
  async function getPageData(_pageId: string | number) {
    setPageData(savedData.value)
    // TODO: 对接接口，暂时注释
    // const pageData = await fetchPageData(_pageId)
    // setPageData(pageData)
  }

  // 保存页面数据
  async function savePage() {
    setPageData(pageData.value, false)
    // await savePageData(newPageData)
    ElMessage.success('保存成功！')
  }

  return {
    pageData,
    components,
    componentSelectedMap,
    currCompId,
    setPageData,
    addComponent,
    cloneComponent,
    removeComponent,
    updateComponentInfo,
    selectElement,
    toggleLockComponent,
    clearSelected,
    changeZIndex,
    getPageData,
    initPage,
    savePage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))

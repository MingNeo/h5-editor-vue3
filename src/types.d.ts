// import { type ViteSSGContext } from 'vite-ssg'
// export type UserModule<T = ViteSSGContext> = (ctx: T) => void

// 如果使用ViteSSG则使用上面的
import type { Router } from 'vue-router'
import type { HeadClient } from '@vueuse/head'
import type { App } from 'vue-demi'

interface Context {
  app: App<Element>
  router: Router
  head?: HeadClient
  isClient: boolean
}

export type UserModule<T = Context> = (ctx: T) => void

export interface PageInfo {
  id?: string | number
  name?: string
  style: any
  option: any
}

export interface ElementInfo {
  id: string
  type: string
  style: any
  option: any
}

export interface PageData {
  pageInfo: PageInfo
  elements: {
    [id: string]: ElementInfo
  }
}

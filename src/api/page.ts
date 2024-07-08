import type { PageData } from '@/types'
import request from '@/utils/request'

export async function fetchPageData(_pageId: string | number): Promise<PageData> {
  // return request('/api/web/page-data', {
  //   method: 'get',
  //   data: { pageId },
  // })

  const res = await {
    pageInfo: {
      id: 0,
      name: '页面1',
      style: {},
      option: {},
    },
    elements: {
      // '001': {
      //   id: '001',
      //   type: 'square',
      //   style: {
      //     width: 200,
      //     height: 200,
      //   },
      //   option: {},
      // },
    },
  }

  return res
}

// 更新整个大屏的配置
export async function savePageData(pageData: any): Promise<any> {
  const res = await request('/api/analyser/dashboard/savePageData', {
    method: 'POST',
    data: { pageData },
  })
  return res
}

/**
 * 根据组件类型返回不同的组件
 */
export function getComponentDefaultInfo({ type, option = {}, style = {} }: { type: string, option?: any, style?: any }) {
  switch (type) {
    // 空白组件
    case 'square':
      return {
        type: 'blank',
        style: {
          width: 200,
          height: 200,
          backgroundColor: '#f0f8ff',
        },
        wrapperStyle: {},
      }
    case 'circle':
      return {
        type: 'blank',
        style: {
          width: 200,
          height: 200,
          backgroundColor: '#f0f8ff',
          borderRadius: '50%',
          ...style,
        },
        wrapperStyle: {},
      }
    // 文本组件
    case 'text':
      return {
        type: 'text',
        style: {
          width: 100,
          height: 30,
          color: '#000',
          fontSize: '14px',
          lineHeight: '30px',
          textAlign: 'center',
          ...style,
        },
        wrapperStyle: {},
        option: {
          text: '文本',
          ...option,
        },
      }
    case 'image':
      return {
        type: 'image',
        style: {
          width: 200,
          height: 200,
          ...style,
        },
        wrapperStyle: {},
        option,
      }
    default:
      return undefined
  }
}

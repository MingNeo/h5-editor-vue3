export function transformStyle(style: Record<string, any> = {}, unit = 'px') {
  const transTypes = ['left', 'top', 'width', 'height', 'fontSize', 'marginRight', 'lineHeight', 'padding', 'borderWidth']
  const newStyle = { ...style }
  Object.entries(style).forEach(([key, val]) => {
    if (transTypes.includes(key))
      newStyle[key] = `${val}${unit}`
  })
  return newStyle
}

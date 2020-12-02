export function updateArabicValue(selectionStart: number, selectionEnd: number, key: string, oldValue: string): string {
  if (selectionStart === selectionEnd) {
    const titleList = [...oldValue]
    titleList.splice(selectionStart as number, 0, key)
    return titleList.join("")
  } else {
    let titleList = [...oldValue]
    titleList = [
      ...titleList.slice(0, selectionStart),
      key,
      ...titleList.slice(selectionEnd)
    ]
    return titleList.join("")
  }
}
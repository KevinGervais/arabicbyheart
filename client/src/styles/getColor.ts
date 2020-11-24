import { colors } from "./colors"
import { ColorItem, AllColors } from "./model"

export function getColor(
  color: keyof AllColors,
  prefix: "primary" | "secondary" | "grey"
): any {
  const primaryObj: any = {}
  Object.keys(colors[color]).forEach((key: string) => {
    primaryObj[`${prefix}${key}`] = colors[color][key as keyof ColorItem]
  })
  return primaryObj
}

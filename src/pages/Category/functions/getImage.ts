import { DuckDuckGoImage, image_search } from "duckduckgo-images-api"

import { CategoryClass } from "../components/Category"

export async function getImage(this: CategoryClass): Promise<string> {
  const { titleList, languageList } = this.state
  const enIndex = languageList.indexOf("en")
  const frIndex = languageList.indexOf("fr")
  const arIndex = languageList.indexOf("ar")
  const index = enIndex === -1 ? frIndex === -1 ? arIndex : frIndex : enIndex
  const result: DuckDuckGoImage[] = await image_search({ query: titleList[index] })
  if (result[0]) {
    return result[0].thumbnail
  } else {
    return ""
  }
}
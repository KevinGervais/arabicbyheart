import GoogleImages from 'google-images'

import { CategoryClass } from "../components/Category"

export async function getImage(this: CategoryClass): Promise<string> {
  const { languageList } = this.state
  const enIndex = languageList.indexOf("en")
  const frIndex = languageList.indexOf("fr")
  const arIndex = languageList.indexOf("ar")
  const index = enIndex === -1 ? frIndex === -1 ? arIndex : frIndex : enIndex
  const client = new GoogleImages('877397795c5259820', 'AIzaSyD5dxjKQnFJ_dHZ7p4tS5OkfuGst_-frfo')
  const result: GoogleImages.Image[] = await client.search("Steve Angello", { safe: "off" })
  console.log(result)
  if (result[0]) {
    return result[0].thumbnail.url
  } else {
    return ""
  }
}
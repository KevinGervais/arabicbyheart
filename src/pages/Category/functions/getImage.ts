import { SpeechLanguages } from '@/model'
import GoogleImages from 'google-images'

export async function getImage(
  titleList: string[],
  languageList: SpeechLanguages[],
  lastImage?: string
): Promise<string | undefined> {
  const enIndex = languageList.indexOf("en")
  const frIndex = languageList.indexOf("fr")
  const arIndex = languageList.indexOf("ar")
  const index = enIndex === -1 ? frIndex === -1 ? arIndex : frIndex : enIndex
  const client = new GoogleImages('877397795c5259820', 'AIzaSyAhz8mkUkgg5QGFGusRDqK30LoIcM9YpzU')
  const result: GoogleImages.Image[] = await client.search(titleList[index], { safe: "off" })
  if (result[0]) {
    if (lastImage) {
      const foundIndex = result.findIndex((img: GoogleImages.Image) => img.thumbnail.url === lastImage)
      if (foundIndex === -1) {
        return result[0].thumbnail.url
      } else {
        if (result[foundIndex + 1]) {
          return result[foundIndex + 1].thumbnail.url

        } else {
          return result[0].thumbnail.url
        }
      }
    } else {
      return result[0].thumbnail.url
    }
  } else {
    return undefined
  }
}
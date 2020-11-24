import GoogleImages from 'google-images'

export async function getImage(
  title: string,
  lastImage?: string
): Promise<string | undefined> {
  const client = new GoogleImages('877397795c5259820', 'AIzaSyAhz8mkUkgg5QGFGusRDqK30LoIcM9YpzU')
  const result: GoogleImages.Image[] = await client.search(title, { safe: "off" })
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
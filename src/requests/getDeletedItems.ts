import { getHost } from "./getHost"
import { jsonToUrlString } from "./jsonToUrlString"
import { GetDeletedItemsQuery } from "./model"

export function getDeletedItems(): Promise<GetDeletedItemsQuery[]> {
  return new Promise((resolve: (data: GetDeletedItemsQuery[]) => void) => {
    const date = window.localStorage.getItem("latestVocabularyDeleteDate") || undefined
    const newDate = new Date().toISOString()
    fetch(`${getHost()}/deleted?${date ? jsonToUrlString({ date }) : ""}`, {
      method: "get",
      headers: {
        "content-type": "application/json"
      },
    }).then((result: Response) => {
      window.localStorage.setItem("latestVocabularyDeleteDate", newDate)
      result.json().then((result1: { data: GetDeletedItemsQuery[] }) => {
        resolve(result1.data)
      })
    }).catch(() => {
      resolve([])
    })
  })
}
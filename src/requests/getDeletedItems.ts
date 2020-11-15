import { getHost } from "./getHost"
import { jsonToUrlString } from "./jsonToUrlString"
import { GetDeletedItemsRequestResult } from "./model"

export function getDeletedItems(): Promise<GetDeletedItemsRequestResult[]> {
  return new Promise((resolve: (data: GetDeletedItemsRequestResult[]) => void) => {
    const date = window.localStorage.getItem("latestVocabularyDeleteDate") || undefined
    const newDate = new Date().toISOString()
    fetch(`${getHost()}/deleted?${date ? jsonToUrlString({ date }) : ""}`, {
      method: "get",
      headers: {
        "content-type": "application/json"
      },
    }).then((result: Response) => {
      window.localStorage.setItem("latestVocabularyDeleteDate", newDate)
      result.json().then((result1: { data: GetDeletedItemsRequestResult[] }) => {
        resolve(result1.data)
      })
    }).catch(() => {
      resolve([])
    })
  })
}
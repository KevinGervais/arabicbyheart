import { getHost } from "./getHost"
import { GetDeletedItemsRequestResult } from "./model"

export function getDeletedItems(): Promise<GetDeletedItemsRequestResult[]> {
  return new Promise((resolve: (data: GetDeletedItemsRequestResult[]) => void) => {
    const date = window.localStorage.getItem("latestVocabularyDeleteDate") || undefined
    const newDate = new Date().toISOString()
    fetch(`${getHost()}/vocabularyDeleted`, {
      body: JSON.stringify({ date }),
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
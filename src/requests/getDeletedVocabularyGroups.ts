import { getHost } from "./getHost"

export function getDeletedVocabularyGroups(): Promise<string[]> {
  return new Promise((resolve: (data: string[]) => void) => {
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
      result.json().then((result1: { data: string[] }) => {
        resolve(result1.data)
      })
    }).catch(() => {
      resolve([])
    })
  })
}
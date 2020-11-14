import { getHost } from "./getHost"
import { GetVocabularyRequestResult } from "./model"

export function getVocabulary(): Promise<GetVocabularyRequestResult[]> {
  return new Promise((resolve: (data: GetVocabularyRequestResult[]) => void) => {
    const date = window.localStorage.getItem("latestVocabularyModifDate") || undefined
    const newDate = new Date().toISOString()
    fetch(`${getHost()}/vocabulary`, {
      body: JSON.stringify({ date }),
      method: "get",
      headers: {
        "content-type": "application/json"
      },
    }).then((result: Response) => {
      window.localStorage.setItem("latestVocabularyModifDate", newDate)
      result.json().then((result1: { data: GetVocabularyRequestResult[] }) => {
        resolve(result1.data)
      })
    }).catch(() => {
      resolve([])
    })
  })
}
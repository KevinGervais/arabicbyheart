import { VocabularyItem } from "@/model"

import { getHost } from "./getHost"

export function getVocabulary(): Promise<VocabularyItem[]> {
  return new Promise((resolve: (data: VocabularyItem[]) => void) => {
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
      result.json().then((result1: { data: VocabularyItem[] }) => {
        resolve(result1.data)
      })
    }).catch(() => {
      resolve([])
    })
  })
}
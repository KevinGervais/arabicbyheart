import { VocabularyCategory } from "@/model"

import { getHost } from "./getHost"
import { jsonToUrlString } from "./jsonToUrlString"

export function getCategories(): Promise<VocabularyCategory[]> {
  return new Promise((resolve: (data: VocabularyCategory[]) => void) => {
    const date = window.localStorage.getItem("latestModifDate") || undefined
    const newDate = new Date().toISOString()
    fetch(`${getHost()}/category?${date ? jsonToUrlString({ date }) : ""}`, {
      method: "get",
      headers: {
        "content-type": "application/json"
      },
    }).then((result: Response) => {
      window.localStorage.setItem("latestModifDate", newDate)
      result.json().then((result1: { data: VocabularyCategory[] }) => {
        resolve(result1.data)
      })
    }).catch(() => {
      resolve([])
    })
  })
}
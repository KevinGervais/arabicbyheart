import { getHost } from "./getHost"
import { AddVocabularyRequestResult } from "./model"

export function deleteCategory(categoryId: string): Promise<Response> {
  return fetch(`${getHost()}/category`, {
    body: JSON.stringify({ categoryId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
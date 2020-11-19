import { getHost } from "./getHost"

export function deleteVocabulary(vocabularyItemId: string, categoryId: string): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify({ vocabularyItemId, categoryId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
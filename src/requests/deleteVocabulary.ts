import { getHost } from "./getHost"

export function deleteVocabulary(vocabularyId: string, categoryId: string): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify({ vocabularyId, categoryId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
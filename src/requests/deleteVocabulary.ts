import { getHost } from "./getHost"
import { AddVocabularyRequest } from "./model"

export function deleteVocabulary(groupId: string): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify({ groupId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
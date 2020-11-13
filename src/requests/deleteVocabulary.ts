import { getHost } from "./getHost"
import { AddVocabularyRequest } from "./model"

export function deleteVocabulary(groupId: string): void {
  fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify({ groupId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
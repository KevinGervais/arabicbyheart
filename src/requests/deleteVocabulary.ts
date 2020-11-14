import { getHost } from "./getHost"

export function deleteVocabulary(groupId: string, vocabularyId: string): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify({ groupId, vocabularyId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
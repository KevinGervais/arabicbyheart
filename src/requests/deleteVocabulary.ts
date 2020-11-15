import { getHost } from "./getHost"

export function deleteVocabulary(groupId: string, categoryId: string): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify({ groupId, categoryId }),
    method: "delete",
    headers: {
      "content-type": "application/json"
    },
  })
}
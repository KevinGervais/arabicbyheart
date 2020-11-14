import { getHost } from "./getHost"
import { AddVocabularyRequest } from "./model"

export function addOrUpdateVocabulary(newVocabulary: AddVocabularyRequest): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify(newVocabulary),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}
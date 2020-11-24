import { getHost } from "./getHost"
import { AddVocabularyQuery } from "./model"

export function addOrUpdateVocabulary(newVocabulary: AddVocabularyQuery): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify(newVocabulary),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}
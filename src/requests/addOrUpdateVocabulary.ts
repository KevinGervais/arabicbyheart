import { getHost } from "./getHost"
import { AddVocabularyRequestResult } from "./model"

export function addOrUpdateVocabulary(newVocabulary: AddVocabularyRequestResult): Promise<Response> {
  return fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify(newVocabulary),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}
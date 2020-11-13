import { getHost } from "./getHost"
import { AddVocabularyRequest } from "./model"

export function addVocabulary(newVocabulary: AddVocabularyRequest): void {
  fetch(`${getHost()}/vocabulary`, {
    body: JSON.stringify(newVocabulary),
    method: "post",
    headers: {
      "content-type": "application/json"
    },
  })
}
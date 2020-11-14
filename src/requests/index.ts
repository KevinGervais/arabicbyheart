import { addOrUpdateCategory } from "./addOrUpdateCategory"
import { addOrUpdateVocabulary } from "./addOrUpdateVocabulary"
import { deleteVocabulary } from "./deleteVocabulary"
import { deleteCategory } from "./deleteCategory"
import { getDeletedVocabularyGroups } from "./getDeletedVocabularyGroups"
import { getHost } from "./getHost"
import { getVocabulary } from "./getVocabulary"

export const allRequests = {
  addOrUpdateCategory,
  addOrUpdateVocabulary,
  deleteVocabulary,
  deleteCategory,
  getDeletedVocabularyGroups,
  getHost,
  getVocabulary,
}
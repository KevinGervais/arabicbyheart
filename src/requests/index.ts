import { addOrUpdateCategory } from "./addOrUpdateCategory"
import { addOrUpdateVocabulary } from "./addOrUpdateVocabulary"
import { deleteVocabulary } from "./deleteVocabulary"
import { deleteCategory } from "./deleteCategory"
import { getDeletedItems } from "./getDeletedItems"
import { getHost } from "./getHost"
import { getVocabulary } from "./getVocabulary"

export const allRequests = {
  addOrUpdateCategory,
  addOrUpdateVocabulary,
  deleteVocabulary,
  deleteCategory,
  getDeletedItems,
  getHost,
  getVocabulary,
}
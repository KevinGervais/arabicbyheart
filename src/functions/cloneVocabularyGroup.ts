import { VocabularyGroup, VocabularyItem } from "@/model"

export function cloneVocabularyGroup(group: VocabularyGroup): VocabularyGroup {
  const newGroup = { ...group }
  newGroup.list = newGroup.list.map((item: VocabularyItem) => ({ ...item }))
  return newGroup
}
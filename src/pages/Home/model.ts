import { Say } from "@/languages/model"
import { VocabularyCategory } from "@/model"

export interface HomeProps {
  vocabularyCategoryList: VocabularyCategory[]
  say: Say
}

export interface HomeState {
  newCategoryTitle: string
  newCategoryVocabularyCount: string
  isCreatingCategory: boolean
}
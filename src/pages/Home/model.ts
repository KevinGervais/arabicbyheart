import { Say } from "@/languages/model"
import { VocabularyCategory } from "@/model"

export interface HomeProps {
  readonly vocabularyCategoryList: VocabularyCategory[]
  readonly say: Say
}

export interface HomeState {
  readonly newCategoryTitle: string
  readonly newCategoryVocabularyCount: string
  readonly isCreatingCategory: boolean
}
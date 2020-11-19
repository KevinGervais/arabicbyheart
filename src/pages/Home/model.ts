import { Languages, Say } from "@/languages/model"
import { VocabularyCategory } from "@/model"

export interface HomeProps {
  readonly vocabularyCategoryList: VocabularyCategory[]
  readonly selectedLanguage: Languages
  readonly say: Say
}

export interface HomeState {
  readonly newCategoryTitle: string
  readonly isCreatingCategory: boolean
}
import { Languages, Say } from "@/languages/model"
import { VocabularyCategory } from "@/model"
import { AllColors } from "@/styles/model"
import { PageNames } from "@/ui/routes/model"

export interface TitleBarState {
  readonly isFullScreen: boolean
  readonly isEditingCategory: boolean
  readonly categoryTitle: string
}

export interface TitleBarProps {
  readonly themeColor: keyof AllColors
  readonly page: PageNames
  readonly say: Say
  readonly selectedCategory?: VocabularyCategory
  readonly selectedLanguage: Languages
}

export interface TitleBarStyledProps {
  readonly page: PageNames
}
import { Say } from "@/languages/model"
import { VocabularyCategory } from "@/model"
import { AllColors } from "@/styles/model"
import { PageNames } from "@/ui/routes/model"

export interface TitleBarState {
  isFullScreen: boolean
}

export interface TitleBarProps {
  themeColor: keyof AllColors
  page: PageNames
  say: Say
  selectedCategory?: VocabularyCategory
}

export interface TitleBarStyledProps {
  page: PageNames
}
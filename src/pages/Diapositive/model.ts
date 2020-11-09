import { Say } from "@/languages/model"
import { DiapositiveSettings, VocabularyCategory } from "@/model"

export interface DiapositiveProps {
  say: Say
  selectedCategory?: VocabularyCategory
  diapositiveSettings?: DiapositiveSettings
}

export interface DiapositiveState {
  currentIndex: number
  timeCounter: number | false
}

export interface DiapositiveStyledProps {
  index: number
}
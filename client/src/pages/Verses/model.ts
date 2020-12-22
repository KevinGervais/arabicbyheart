import { VocabularyItem } from "@/model"

export interface VersesProps {
  selectedVocabularyItem?: VocabularyItem
}

export interface VersesStates {
  verseList: QuranVerse[]
}

export interface QuranVerse {
  surah_number: number
  verse_number: number
  text: string
  translation: string
}
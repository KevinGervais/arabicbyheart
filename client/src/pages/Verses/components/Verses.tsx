import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"

import { handleScroll, simplifyArabicItemText } from "../functions"
import { getQuranVerses } from "../functions/getQuranVerses"
import { QuranVerse, VersesProps, VersesStates } from "../model"

import { VersesStyled } from "./VersesStyled"

class VersesNotConnected extends React.Component<VersesProps, VersesStates> {
  maxVerseCount: number = 10
  nextVerseIndex: number = 0
  constructor(props: VersesProps) {
    super(props)
    if (props.selectedVocabularyItem) {
      const [verses, nextIndex] = getQuranVerses(this.nextVerseIndex, this.maxVerseCount, props.selectedVocabularyItem)
      this.nextVerseIndex = nextIndex
      this.state = {
        verseList: verses
      }
    } else {
      this.state = { verseList: [] }
    }
  }
  render(): JSX.Element | null {
    const { selectedVocabularyItem } = this.props
    const { verseList } = this.state
    if (!selectedVocabularyItem) {
      return null
    }
    return (
      <VersesStyled onScroll={(evt: React.UIEvent<HTMLDivElement, UIEvent>) => handleScroll(
        evt,
        this.maxVerseCount,
        this.nextVerseIndex,
        verseList,
        selectedVocabularyItem,
        (newVerseList: QuranVerse[], newIndex: number) => {
          this.setState({ verseList: newVerseList })
          this.nextVerseIndex = newIndex
        }
      )}>
        {verseList.map((verse: QuranVerse) => {
          const simplifiedArabic = simplifyArabicItemText(selectedVocabularyItem.languageItems.ar.title)
          const textArray = verse.text.split(simplifiedArabic)
          let ligaturePosition: undefined | "end" | "start"
          if (!simplifiedArabic.startsWith(" ")) {
            ligaturePosition = "start"
          } else if (!simplifiedArabic.endsWith(" ")) {
            ligaturePosition = "end"
          }
          const textWithHilight = textArray.reduce((
            array: (JSX.Element | string)[],
            elem: string,
            index: number
          ) => {
            if (index === 0) {
              return [elem]
            } if (ligaturePosition === "end") {
              return [...array, " ", <span>{selectedVocabularyItem.languageItems.ar.title}</span>, elem]
            } else if (ligaturePosition === "start") {
              return [...array, <span>{selectedVocabularyItem.languageItems.ar.title}</span>, " ", elem]
            } else {
              return [...array, " ", <span>{selectedVocabularyItem.languageItems.ar.title}</span>, " ", elem]
            }
          }, [])
          const key = `${verse.surah_number}:${verse.verse_number}`
          return (
            <div className="verse" key={key}>
              <div className="arabic">
                {textWithHilight}
              </div>
              <div className="translation">
                {verse.translation}
              </div>
              <div className="key">
                {key}
              </div>
            </div>
          )
        })}
      </VersesStyled>
    )
  }
}

export const Verses = connect((state: ReduxState) => ({ selectedVocabularyItem: state.selectedVocabularyItem }))(VersesNotConnected)
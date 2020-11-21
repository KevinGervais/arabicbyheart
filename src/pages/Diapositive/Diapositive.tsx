import { VocabularyItem } from "@/model"
import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import ArrowIcon from "@/images/rightArrow"
import { playAudio } from "@/functions/playAudio"

import { DiapositiveStyled } from "./DiapositiveStyled"
import { DiapositiveItemObject, DiapositiveProps, DiapositiveState } from "./model"
import { DiapositiveItem } from "./DiapositiveItem"
export class DiapositiveClass extends React.Component<DiapositiveProps, DiapositiveState> {
  items: DiapositiveItemObject[] = []
  timeRef: HTMLInputElement | undefined
  lastInterval: number = -1
  timeoutId: number = -1
  constructor(props: DiapositiveProps) {
    super(props)
    const { selectedCategory, diapositiveSettings } = props
    if (!selectedCategory || !diapositiveSettings) {
      this.state = {
        currentIndex: 0,
        timeCounter: false,
      }
      this.items = []
    } else {
      this.state = {
        currentIndex: 0,
        timeCounter: diapositiveSettings.delay,
      }
      this.setItems(props)
    }
  }

  setItems(props: DiapositiveProps): void {
    const { selectedCategory, diapositiveSettings, selectedLanguage } = props
    if (!selectedCategory || !diapositiveSettings) {
      this.items = []
      return
    }
    this.items = selectedCategory.items.map((vocabularyItem: VocabularyItem) => {
      const diapositiveItems: DiapositiveItemObject[] = []
      if (diapositiveSettings.isSelectedTitleActive) {
        diapositiveItems.push({
          currentLanguageItem: { ...vocabularyItem.languageItems[selectedLanguage] },
          image: vocabularyItem.image,
          isImageOnly: false,
          language: selectedLanguage,
          languageItems: vocabularyItem.languageItems
        })
      }
      if (diapositiveSettings.isArabicTitleActive) {
        diapositiveItems.push({
          currentLanguageItem: { ...vocabularyItem.languageItems.ar },
          image: vocabularyItem.image,
          isImageOnly: false,
          language: "ar",
          languageItems: vocabularyItem.languageItems
        })
      }
      if (diapositiveItems.length === 0) {
        diapositiveItems.push({
          currentLanguageItem: { ...vocabularyItem.languageItems.ar },
          image: vocabularyItem.image,
          isImageOnly: true,
          language: "ar",
          languageItems: vocabularyItem.languageItems
        })
      }
      return diapositiveItems
    }).flat()
    if (diapositiveSettings.isShuffle) {
      this.items = this.items.sort(() => Math.random() - 0.5)
      this.items = this.items.sort(() => Math.random() - 0.5)
      this.items = this.items.sort(() => Math.random() - 0.5)
    }
  }

  UNSAFE_componentWillUpdate(newProps: DiapositiveProps): void {
    const { selectedCategory, diapositiveSettings } = this.props
    if ((!selectedCategory && newProps.selectedCategory) || (!diapositiveSettings && newProps.diapositiveSettings)) {
      this.setItems(newProps)
    }
  }
  render(): JSX.Element | null {
    const { selectedCategory, diapositiveSettings, say, selectedLanguage } = this.props
    const { currentIndex } = this.state
    const item: DiapositiveItemObject | undefined = this.items[currentIndex]
    if (!selectedCategory || !diapositiveSettings || item === undefined) {
      return <DiapositiveStyled index={0} indexCount={this.items.length} />
    }

    if (diapositiveSettings.isMicrophone && item.currentLanguageItem.audio) {
      playAudio(item.currentLanguageItem.audio)
    }
    let hasChanged: boolean = false
    if (diapositiveSettings.delay !== false && currentIndex !== this.items.length - 1) {
      window.clearTimeout(this.timeoutId)
      this.timeoutId = window.setTimeout(() => {
        if (!hasChanged) {
          this.setState({ currentIndex: currentIndex + 1 })
        }
      }, diapositiveSettings.delay * 1000)
      window.clearInterval(this.lastInterval)
      this.lastInterval = window.setInterval(() => {
        if (this.timeRef && this.timeRef.value === "1") {
          window.clearInterval(this.lastInterval)
        } else if (this.timeRef) {
          this.timeRef.value = String(Number(this.timeRef.value) - 1)
        }
      }, 1000)
    }

    return (
      <DiapositiveStyled index={currentIndex} indexCount={this.items.length}>

        <div className="content">
          <ArrowIcon onClick={() => {
            hasChanged = true
            if (currentIndex !== 0) {
              this.setState({ currentIndex: currentIndex - 1 })
            }
          }} />
          <h3>{`${currentIndex + 1}/${this.items.length}`}</h3>
          <DiapositiveItem
            isHarakat={diapositiveSettings.isHarakat}
            isImage={diapositiveSettings.isImage}
            currentDiapositiveItem={item}
            selectedLanguage={selectedLanguage}
            say={say}
          />
          <ArrowIcon onClick={() => {
            hasChanged = true
            if (currentIndex !== this.items.length - 1) {
              this.setState({ currentIndex: currentIndex + 1 })
            }
          }} />
        </div>
        {diapositiveSettings.delay !== false && <input ref={(ref: HTMLInputElement) => {
          this.timeRef = ref
          if (this.timeRef) {
            this.timeRef.value = String(diapositiveSettings.delay as number)
          }
        }} />}
      </DiapositiveStyled>
    )
  }
}

export const Diapositive = connect((state: ReduxState): DiapositiveProps => ({
  say: state.say,
  selectedCategory: state.selectedCategory,
  diapositiveSettings: state.diapositiveSettings,
  selectedLanguage: state.selectedLanguage

}))(DiapositiveClass)
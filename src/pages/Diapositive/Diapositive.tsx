import { VocabularyGroup, VocabularyItem } from "@/model"
import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import ArrowIcon from "@/images/rightArrow"

import { DiapositiveStyled } from "./DiapositiveStyled"
import { DiapositiveItemObject, DiapositiveProps, DiapositiveState } from "./model"
import { DiapositiveItem } from "./DiapositiveItem"
export class DiapositiveClass extends React.Component<DiapositiveProps, DiapositiveState> {
  items: DiapositiveItemObject[] = []
  timeRef: HTMLInputElement | undefined
  lastInterval: number = -1
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
    const { selectedCategory, diapositiveSettings } = props
    if (!selectedCategory || !diapositiveSettings) {
      this.items = []
      return
    }
    this.items = selectedCategory.items.map((group: VocabularyGroup) => {
      const filteredList = group.list
        .filter((val: VocabularyItem, index: number) => diapositiveSettings.isTitlesFromListActive[index])
      let isImageOnly: boolean = false
      if (filteredList.length === 0) {
        filteredList.push(group.list[0])
        isImageOnly = true
      }
      const diapositiveItem = filteredList.map((vocabularyItem: VocabularyItem): DiapositiveItemObject => (
        { ...vocabularyItem, image: group.image, isImageOnly }
      ))
      return diapositiveItem
    }).flat()
    if (diapositiveSettings.isShuffle) {
      this.items = this.items.sort(Math.random)
    }
  }

  UNSAFE_componentWillUpdate(newProps: DiapositiveProps): void {
    const { selectedCategory, diapositiveSettings } = this.props
    if ((!selectedCategory && newProps.selectedCategory) || (!diapositiveSettings && newProps.diapositiveSettings)) {
      this.setItems(newProps)
    }
  }
  render(): JSX.Element | null {
    const { selectedCategory, diapositiveSettings, say } = this.props
    const { currentIndex } = this.state
    const item: DiapositiveItemObject | undefined = this.items[currentIndex]
    if (!selectedCategory || !diapositiveSettings || item === undefined) {
      return <DiapositiveStyled index={0} />
    }
    const vocabularyGroup: VocabularyGroup = selectedCategory.items
      .find((group: VocabularyGroup) => group.list
        .find((vocItem: VocabularyItem) => vocItem._id === item._id
        )) as VocabularyGroup

    if (diapositiveSettings.isMicrophone && item.audio !== "") {
      const audio = new Audio(item.audio)
      audio.play()
    }
    let hasChanged: boolean = false
    if (diapositiveSettings.delay !== false && currentIndex !== this.items.length - 1) {
      window.setTimeout(() => {
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
      <DiapositiveStyled index={currentIndex}>
        <ArrowIcon onClick={() => {
          hasChanged = true
          if (currentIndex !== 0) {
            this.setState({ currentIndex: currentIndex - 1 })
          }
        }} />

        <div className="content">
          <h3>{`${currentIndex + 1}/${this.items.length}`}</h3>
          <DiapositiveItem
            isImage={diapositiveSettings.isImage}
            currentVocabularyGroup={vocabularyGroup}
            currentVocabularyItem={item}
            say={say}
          />
        </div>
        {diapositiveSettings.delay !== false && <input ref={(ref: HTMLInputElement) => {
          this.timeRef = ref
          if (this.timeRef) {
            this.timeRef.value = String(diapositiveSettings.delay as number)
          }
        }} />}
        <ArrowIcon onClick={() => {
          hasChanged = true
          if (currentIndex !== this.items.length - 1) {
            this.setState({ currentIndex: currentIndex + 1 })
          }
        }} />
      </DiapositiveStyled>
    )
  }
}

export const Diapositive = connect((state: ReduxState): DiapositiveProps => ({
  say: state.say,
  selectedCategory: state.selectedCategory,
  diapositiveSettings: state.diapositiveSettings,

}))(DiapositiveClass)
import { VocabularyItem } from "@/model"
import React from "react"
import PlayIcon from "@/images/play"

import { DiapositiveItemProps, DiapositiveItemState } from "./model"
import { DiapositiveItemStyled } from "./DiapositiveItemStyled"

export class DiapositiveItem extends React.Component<DiapositiveItemProps, DiapositiveItemState>{
  state: DiapositiveItemState = {
    isAnswerShown: false
  }
  componentDidUpdate(oldProps: DiapositiveItemProps): void {
    const { currentVocabularyItem } = this.props
    const { isAnswerShown } = this.state
    if (isAnswerShown && oldProps.currentVocabularyItem._id !== currentVocabularyItem._id) {
      this.setState({ isAnswerShown: false })
    }
  }

  render(): JSX.Element {
    const { currentVocabularyGroup, currentVocabularyItem, say } = this.props
    const { isAnswerShown } = this.state
    return (
      <DiapositiveItemStyled>
        {!isAnswerShown && (
          <span>
            {currentVocabularyItem.title}
            {currentVocabularyItem.audio !== "" && <PlayIcon onClick={() => new Audio(currentVocabularyItem.audio).play()} />}
          </span>
        )}
        {!isAnswerShown && (
          <h4 onClick={() => this.setState({ isAnswerShown: true })}>{say.showAnswer}</h4>
        )}
        {isAnswerShown && currentVocabularyGroup.list.sort((itemA: VocabularyItem, itemB: VocabularyItem) => {
          if (itemA._id === currentVocabularyItem._id) {
            return -1
          }
          if (itemB._id === currentVocabularyItem._id) {
            return 1
          } else {
            return 0
          }
        }).map((vocItem: VocabularyItem) => (
          <span>
            {vocItem.title}
            {vocItem.audio !== "" && <PlayIcon onClick={() => new Audio(vocItem.audio).play()} />}
          </span>
        ))}
        <span>{say[currentVocabularyItem.lang]}</span>
      </DiapositiveItemStyled>
    )
  }
}
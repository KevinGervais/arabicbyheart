import { VocabularyItem } from "@/model"
import React from "react"
import PlayIcon from "@/images/play"
import { cloneVocabularyGroup } from "@/functions"

import { DiapositiveItemProps, DiapositiveItemState } from "./model"
import { DiapositiveItemStyled } from "./DiapositiveItemStyled"

export class DiapositiveItem extends React.Component<DiapositiveItemProps, DiapositiveItemState>{
  state: DiapositiveItemState = {
    isAnswerShown: false
  }
  componentDidUpdate(oldProps: DiapositiveItemProps): void {
    const { currentVocabularyItem, currentVocabularyGroup, } = this.props
    const { isAnswerShown } = this.state
    if (
      isAnswerShown
      && (
        (
          currentVocabularyItem
          && oldProps.currentVocabularyItem
          && oldProps.currentVocabularyItem._id !== currentVocabularyItem._id
        )
        || (
          currentVocabularyGroup.image !== oldProps.currentVocabularyGroup.image
        ))
    ) {
      this.setState({ isAnswerShown: false })
    }
  }

  render(): JSX.Element {
    const { currentVocabularyGroup, currentVocabularyItem, say, isImage, languageList } = this.props
    const index: number = currentVocabularyGroup.list.findIndex((item: VocabularyItem) => item._id === currentVocabularyItem._id)
    const { isAnswerShown } = this.state
    return (
      <DiapositiveItemStyled>
        {!isAnswerShown && (
          <>
            {isImage && currentVocabularyGroup.image && <img src={currentVocabularyGroup.image} alt={currentVocabularyItem && currentVocabularyItem.title} />}
            {currentVocabularyItem && !currentVocabularyItem.isImageOnly && <span>
              {currentVocabularyItem.title}
              {currentVocabularyItem.audio !== "" && <PlayIcon onClick={() => new Audio(currentVocabularyItem.audio).play()} />}
            </span>}
            <h4 onClick={() => this.setState({ isAnswerShown: true })}>{say.showAnswer}</h4>
          </>
        )}
        {isAnswerShown && isImage && currentVocabularyGroup.image && (
          <img src={currentVocabularyGroup.image} alt={currentVocabularyItem && currentVocabularyItem.title} />
        )}
        {isAnswerShown && cloneVocabularyGroup(currentVocabularyGroup).list.sort((itemA: VocabularyItem, itemB: VocabularyItem) => {
          if (!currentVocabularyItem) {
            return 0
          }
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
        {isAnswerShown && !isImage && currentVocabularyGroup.image && (
          <img src={currentVocabularyGroup.image} alt={currentVocabularyItem && currentVocabularyItem.title} />
        )}

        {currentVocabularyItem && <span>{say[languageList[index]]}</span>}
      </DiapositiveItemStyled>
    )
  }
}
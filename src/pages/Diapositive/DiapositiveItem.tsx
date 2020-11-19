import React from "react"
import PlayIcon from "@/images/play"

import { DiapositiveItemProps, DiapositiveItemState } from "./model"
import { DiapositiveItemStyled } from "./DiapositiveItemStyled"

export class DiapositiveItem extends React.Component<DiapositiveItemProps, DiapositiveItemState>{
  state: DiapositiveItemState = {
    isAnswerShown: false
  }
  componentDidUpdate(oldProps: DiapositiveItemProps): void {
    const { currentDiapositiveItem, } = this.props
    const { isAnswerShown } = this.state
    if (
      isAnswerShown
      && (
        (
          currentDiapositiveItem
          && oldProps.currentDiapositiveItem
          && oldProps.currentDiapositiveItem.currentLanguageItem._id !== currentDiapositiveItem.currentLanguageItem._id
        )
        || (
          currentDiapositiveItem.image !== oldProps.currentDiapositiveItem.image
        ))
    ) {
      this.setState({ isAnswerShown: false })
    }
  }

  render(): JSX.Element {
    const { currentDiapositiveItem, say, isImage, isHarakat, selectedLanguage } = this.props
    const { isAnswerShown } = this.state
    const notCurrentLanguage = currentDiapositiveItem.language === "ar" ? selectedLanguage : "ar"
    return (
      <DiapositiveItemStyled>
        {!isAnswerShown && (
          <>
            {isImage && currentDiapositiveItem.image && (
              <img
                src={currentDiapositiveItem.image}
                alt={currentDiapositiveItem.currentLanguageItem.title}
              />
            )}
            {!currentDiapositiveItem.isImageOnly && (
              <span>
                {isHarakat ? currentDiapositiveItem.currentLanguageItem.title : removeHarakat(currentDiapositiveItem.currentLanguageItem.title)}
                {currentDiapositiveItem.currentLanguageItem.audio !== "" && (
                  <PlayIcon onClick={() => new Audio(currentDiapositiveItem.currentLanguageItem.audio).play()} />
                )}
              </span>)}
            <h4 onClick={() => this.setState({ isAnswerShown: true })}>{say.showAnswer}</h4>
          </>
        )}
        {isAnswerShown && isImage && currentDiapositiveItem.image && (
          <img src={currentDiapositiveItem.image} alt={currentDiapositiveItem && currentDiapositiveItem.languageItems[selectedLanguage].title} />
        )}
        {isAnswerShown &&
          <>
            <span>
              {currentDiapositiveItem.currentLanguageItem.title}
              {currentDiapositiveItem.currentLanguageItem.audio !== "" && (
                <PlayIcon onClick={() => new Audio(currentDiapositiveItem.currentLanguageItem.audio).play()} />
              )}
            </span>
            <span>
              {currentDiapositiveItem.languageItems[notCurrentLanguage].title}
              {currentDiapositiveItem.languageItems[notCurrentLanguage].audio !== "" && (
                <PlayIcon onClick={() => new Audio(currentDiapositiveItem.languageItems[notCurrentLanguage].audio).play()} />
              )}
            </span>
          </>
        }
        {isAnswerShown && !isImage && currentDiapositiveItem.image && (
          <img src={currentDiapositiveItem.image} alt={currentDiapositiveItem && currentDiapositiveItem.languageItems[selectedLanguage].title} />
        )}

        {currentDiapositiveItem && <span>{say[currentDiapositiveItem.language]}</span>}
      </DiapositiveItemStyled>
    )
  }
}

const removeHarakat = (str: string): string => (
  str
    .split("َ").join("")
    .split("ُ").join("")
    .split("ِ").join("")
    .split("ََ").join("")
    .split("ُُ").join("")
    .split("ِِ").join("")
    .split("ْ").join("")
    .split("ّ").join("")
)
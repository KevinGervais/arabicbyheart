import React from "react"
import ListenIcon from "@/images/listen"
import { playAudio } from "@/functions/playAudio"

import { DiapositiveItemProps, DiapositiveItemState } from "../model"
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
                {currentDiapositiveItem.currentLanguageItem.audio && (
                  <ListenIcon onClick={() => playAudio(currentDiapositiveItem.currentLanguageItem.audio as string)} />
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
                <ListenIcon onClick={() => playAudio(currentDiapositiveItem.currentLanguageItem.audio as string)} />
              )}
            </span>
            <span>
              {currentDiapositiveItem.languageItems[notCurrentLanguage].title}
              {currentDiapositiveItem.languageItems[notCurrentLanguage].audio !== "" && (
                <ListenIcon onClick={() => playAudio(currentDiapositiveItem.languageItems[notCurrentLanguage].audio as string)} />
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
    .split("أ").join("ا")
    .split("إ").join("ا")
)
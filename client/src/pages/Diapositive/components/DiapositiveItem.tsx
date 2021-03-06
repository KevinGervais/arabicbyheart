import React from "react"
import ListenIcon from "@/images/listen"
import { playAudio } from "@/functions/playAudio"
import { removeHarakat } from "@/functions"

import { DiapositiveItemProps, DiapositiveItemState } from "../model"

import { DiapositiveItemStyled } from "./DiapositiveItemStyled"

export class DiapositiveItem extends React.Component<DiapositiveItemProps, DiapositiveItemState>{
  state: DiapositiveItemState = {
    isAnswerShown: false,
    isHarakatShown: false,
  }
  componentDidUpdate(oldProps: DiapositiveItemProps): void {
    const { currentDiapositiveItem, } = this.props
    const { isAnswerShown, isHarakatShown } = this.state
    if (
      (isAnswerShown || isHarakatShown || isHarakatShown)
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
      this.setState({ isAnswerShown: false, isHarakatShown: false })
    }
  }

  render(): JSX.Element {
    const { currentDiapositiveItem, say, isImage, isHarakat, selectedLanguage } = this.props
    const { isAnswerShown, isHarakatShown } = this.state
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
              <span className={currentDiapositiveItem.language === "ar" ? "arabic" : ""}>
                {
                  (isHarakat || isHarakatShown)
                    ? currentDiapositiveItem.currentLanguageItem.title
                    : removeHarakat(currentDiapositiveItem.currentLanguageItem.title)
                }
                {!isHarakatShown && !isHarakat && currentDiapositiveItem.language === "ar" && (
                  <div className="harakat" onClick={() => this.setState({ isHarakatShown: true })}><div>َّ</div></div>
                )}
                <ListenIcon onClick={() => playAudio(currentDiapositiveItem.currentLanguageItem.title, currentDiapositiveItem.language)} />
              </span>)}
            <h4 onClick={() => this.setState({ isAnswerShown: true })}>{say.showAnswer}</h4>
          </>
        )}
        {isAnswerShown && isImage && currentDiapositiveItem.image && (
          <img src={currentDiapositiveItem.image} alt={currentDiapositiveItem && currentDiapositiveItem.languageItems[selectedLanguage].title} />
        )}
        {isAnswerShown &&
          <>
            <span className={currentDiapositiveItem.language === "ar" ? "arabic" : ""}>
              {
                (isHarakat || isHarakatShown)
                  ? currentDiapositiveItem.currentLanguageItem.title
                  : removeHarakat(currentDiapositiveItem.currentLanguageItem.title)
              }
              {!isHarakatShown && !isHarakat && currentDiapositiveItem.language === "ar" && (
                <div className="harakat" onClick={() => this.setState({ isHarakatShown: true })}><div>َّ</div></div>
              )}
              <ListenIcon onClick={() => playAudio(currentDiapositiveItem.currentLanguageItem.title, currentDiapositiveItem.language)} />
            </span>
            <span className={notCurrentLanguage === "ar" ? "arabic" : ""}>
              {
                (isHarakat || isHarakatShown)
                  ? currentDiapositiveItem.languageItems[notCurrentLanguage].title
                  : removeHarakat(currentDiapositiveItem.languageItems[notCurrentLanguage].title)
              }
              {!isHarakatShown && !isHarakat && notCurrentLanguage === "ar" && (
                <div className="harakat" onClick={() => this.setState({ isHarakatShown: true })}><div>َّ</div></div>
              )}
              <ListenIcon onClick={() => playAudio(currentDiapositiveItem.languageItems[notCurrentLanguage].title, "ar")} />
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

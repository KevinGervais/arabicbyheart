import React, { useState } from "react"
import MicroIcon from "@/images/micro"
import StopIcon from "@/images/stop"
import KeyboardIcon from "@/images/keyboard"
import Tooltip from "react-tooltip"

import * as functions from "../functions"
import { CreatedLanguageItemProps } from "../model"

import { CategoryClass } from "./Category"
import { CreatedLanguageItemStyled } from "./CreatedLanguageItemStyled"

export function CreatedLanguageItem(this: CategoryClass, props: CreatedLanguageItemProps): JSX.Element {
  const { isArabic } = props
  const { say, selectedLanguage } = this.props
  const [isKeyboardOpened, setKeyboardActivity] = useState(false)
  const {
    selectedTitle,
    arabicTitle,
    recordingLanguage,
  } = this.state
  const title = isArabic ? arabicTitle : selectedTitle
  const language = isArabic ? "ar" : selectedLanguage
  const isRecording = isArabic ? recordingLanguage === "ar" : recordingLanguage === selectedLanguage
  return (
    <CreatedLanguageItemStyled className={language === "ar" ? "arabic" : ""}>

      <h4>{isArabic ? "ar" : selectedLanguage}</h4>
      <input
        lang={language}
        className={language === "ar" ? "arabic-input" : "selected-language-input"}
        placeholder={say.vocabularyPlacehoder}
        value={title}
        onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
          if (evt.key.length === 1 && language === "ar" && !evt.metaKey) {
            evt.preventDefault()
            let newTitle = title
            const key = evt.altKey && evt.key === " " ? "ُ" : functions.latinKeyToArabic(evt.key)
            newTitle = newTitle + key
            if (isArabic) {
              this.setState({ arabicTitle: newTitle })
            } else {
              this.setState({ selectedTitle: newTitle })
            }
          }
        }}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          if (isArabic) {
            this.setState({ arabicTitle: evt.target.value })
          } else {
            this.setState({ selectedTitle: evt.target.value })
          }
        }}
      />
      {isArabic && (
        <div className="keyboard-button">
          <KeyboardIcon onClick={() => setKeyboardActivity(!isKeyboardOpened)} />
          {isKeyboardOpened && <this.Harakat onChange={(newChar: string) => this.setState({ arabicTitle: `${title}${newChar}` })} />}

        </div>
      )}
      {!isRecording && <MicroIcon data-for="record-tooltip" data-tip onClick={() => {
        this.setState({ recordingLanguage: language })
        try {
          this.titleRecorder.start()
          if (this.titleSpeech) {
            this.titleSpeech.lang = language
            this.titleSpeech.start()
          }
        } catch (err) {
          // do nothing
        }
      }} />}
      <Tooltip id="record-tooltip" effect="solid" place="right" getContent={() => say.record} />
      {isRecording && <StopIcon onClick={this.onAudioStop} />}
    </CreatedLanguageItemStyled>
  )
}
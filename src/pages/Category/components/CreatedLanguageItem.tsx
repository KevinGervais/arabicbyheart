import React from "react"
import MicroIcon from "@/images/micro"
import StopIcon from "@/images/stop"
import Tooltip from "react-tooltip"

import * as functions from "../functions"
import { CreatedLanguageItemProps } from "../model"

import { CategoryClass } from "./Category"

export function CreatedLanguageItem(this: CategoryClass, props: CreatedLanguageItemProps): JSX.Element {
  const { isArabic } = props
  const { say, selectedLanguage } = this.props
  const {
    selectedTitle,
    arabicTitle,
    recordingLanguage,
  } = this.state
  const title = isArabic ? arabicTitle : selectedTitle
  const language = isArabic ? "ar" : selectedLanguage
  const isRecording = isArabic ? recordingLanguage === "ar" : recordingLanguage === selectedLanguage
  return (
    <div>
      <h4>{isArabic ? say.ar : say[selectedLanguage]}</h4>
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
      <input
        className={language === "ar" ? "arabic-input" : ""}
        placeholder={say.vocabularyPlacehoder}
        value={title}
        onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
          if (evt.key.length === 1 && language === "ar") {
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
    </div>
  )
}
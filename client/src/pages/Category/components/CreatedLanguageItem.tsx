import React, { useState } from "react"
import KeyboardIcon from "@/images/keyboard"

import * as functions from "../functions"
import { CreatedLanguageItemProps } from "../model"
import { updateArabicValue } from "../functions"

import { CategoryClass } from "./Category"
import { CreatedLanguageItemStyled } from "./CreatedLanguageItemStyled"

export function CreatedLanguageItem(this: CategoryClass, props: CreatedLanguageItemProps): JSX.Element {
  const { isArabic } = props
  const { say, selectedLanguage } = this.props
  const [isKeyboardOpened, setKeyboardActivity] = useState(false)
  const {
    selectedTitle,
    arabicTitle,
  } = this.state
  const title = isArabic ? arabicTitle : selectedTitle
  const language = isArabic ? "ar" : selectedLanguage
  const currentRef = isArabic ? this.arabicInputRef : this.selectedInputRef
  return (
    <CreatedLanguageItemStyled className={language === "ar" ? "arabic" : ""}>
      <h4>{isArabic ? "ar" : selectedLanguage}</h4>
      {isArabic && (
        <div className="keyboard-button">
          <KeyboardIcon onClick={() => setKeyboardActivity(!isKeyboardOpened)} />
          {isKeyboardOpened && <this.Harakat onChange={(newChar: string) => {
            const selectionStart = currentRef?.selectionStart as number
            const selectionEnd = currentRef?.selectionEnd as number
            this.setState({
              arabicTitle: updateArabicValue(selectionStart, selectionEnd, newChar, title)
            }, () => {
              currentRef?.setSelectionRange(selectionStart + 1, selectionStart + 1)
            })
          }} />}

        </div>
      )}
      <input
        ref={(ref: HTMLInputElement) => isArabic ? this.arabicInputRef = ref : this.selectedInputRef = ref}
        lang={language}
        className={language === "ar" ? "arabic-input" : "selected-language-input"}
        placeholder={say.vocabularyPlacehoder}
        value={title}
        onBlur={(evt: React.FocusEvent<HTMLInputElement>) => {
          const ref = isArabic ? this.arabicInputRef : this.selectedInputRef
          console.log()
          if (!evt.relatedTarget) {
            ref?.focus()
          }
        }}
        onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
          if (evt.key.length === 1 && isArabic && !evt.metaKey) {
            evt.preventDefault()
            const selectionStart = currentRef?.selectionStart as number
            const selectionEnd = currentRef?.selectionEnd as number
            const key = evt.altKey && evt.key === " " ? "ُ" : functions.latinKeyToArabic(evt.key)
            this.setState({
              arabicTitle: updateArabicValue(selectionStart, selectionEnd, key, title)
            }, () => {
              currentRef?.setSelectionRange(selectionStart + 1, selectionStart + 1)
            })
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

    </CreatedLanguageItemStyled>
  )
}
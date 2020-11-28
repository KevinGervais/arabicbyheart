import React from "react"
import SyncIcon from "@/images/sync"
import ListenIcon from "@/images/listen"
import DeleteIcon from "@/images/delete"
import PencilIcon from "@/images/pencil"
import CloseIcon from "@/images/close"
import SaveIcon from "@/images/save"
import { VocabularyCategory } from "@/model"
import { playAudio } from "@/functions/playAudio"

import { VocabularyItemProps } from "../model"
import * as functions from "../functions"
import { deleteItem, editVocabulary } from "../functions"

import { CategoryClass } from "./Category"
import { VocabularyItemStyled } from "./VocabularyItemStyled"

export function VocabularyItemComponent(this: CategoryClass, props: VocabularyItemProps): JSX.Element | null {
  const { vocabularyItem, index } = props
  const { selectedCategory, say, vocabularyCategoryList, selectedLanguage } = this.props
  const {
    selectedTitle,
    arabicTitle,
  } = this.state
  const {
    editingVocabularyIndex
  } = this.state
  if (!selectedCategory) {
    return null
  }
  const { isMultipleCategory } = selectedCategory

  return (
    <VocabularyItemStyled key={vocabularyItem._id}>
      {vocabularyItem.image && (
        <div
          className="img"
          onClick={() => functions.updateVocabularyImage(selectedCategory as VocabularyCategory, vocabularyItem, vocabularyCategoryList)}
        >
          <img src={vocabularyItem.image} alt={vocabularyItem.languageItems.fr.title} />
          <SyncIcon />
        </div>
      )}

      <div className="vertical-container">
        {editingVocabularyIndex !== index && (
          <>
            <div className="item">
              <span>{selectedLanguage}</span>
              <h4>{vocabularyItem.languageItems[selectedLanguage].title}</h4>
              <ListenIcon onClick={() => playAudio(vocabularyItem.languageItems[selectedLanguage].title, selectedLanguage)} />
            </div>
            <div className="item">
              <span>ar</span>
              <h4>{vocabularyItem.languageItems.ar.title}</h4>
              <ListenIcon onClick={() => playAudio(vocabularyItem.languageItems.ar.title, "ar")} />
            </div>
          </>
        )}
        {editingVocabularyIndex === index && (
          <>
            <this.CreatedLanguageItem index={index} />
            <this.CreatedLanguageItem isArabic index={index} />
          </>
        )}

        <div className="buttons">
          {!isMultipleCategory && editingVocabularyIndex !== index && (
            <>
              <PencilIcon data-tip={say.edit} onClick={() => this.setState({
                editingVocabularyIndex: index,
                selectedTitle: vocabularyItem.languageItems[selectedLanguage].title,
                arabicTitle: vocabularyItem.languageItems.ar.title,
              })} />
              <DeleteIcon data-tip={say.delete} onClick={() => deleteItem(index)} />
            </>
          )}
          {editingVocabularyIndex === index && (
            <>
              <SaveIcon data-tip={say.save} onClick={() => editVocabulary(
                selectedTitle,
                arabicTitle,
                vocabularyItem,
                index,
                () => this.setState({
                  editingVocabularyIndex: -1,
                  selectedTitle: "",
                  arabicTitle: "",
                })
              )} />
              <CloseIcon data-tip={say.cancel} onClick={() => this.setState({
                editingVocabularyIndex: -1,
                selectedTitle: "",
                arabicTitle: "",
              })} />
            </>
          )}
        </div>
      </div>
    </VocabularyItemStyled>
  )
}
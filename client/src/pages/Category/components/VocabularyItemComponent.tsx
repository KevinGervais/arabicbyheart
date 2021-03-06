import React from "react"
import SyncIcon from "@/images/sync"
import ListenIcon from "@/images/listen"
import DeleteIcon from "@/images/delete"
import PencilIcon from "@/images/pencil"
import QuranIcon from "@/images/quran"
import CloseIcon from "@/images/close"
import SaveIcon from "@/images/save"
import BookmarkActiveIcon from "@/images/bookmarkActive"
import BookmarkInactiveIcon from "@/images/bookmarkInactive"
import { BookmarkItem, VocabularyCategory } from "@/model"
import { playAudio } from "@/functions/playAudio"
import { Modal } from "@/components"
import { setReduxState } from "@/redux"

import { VocabularyItemProps } from "../model"
import * as functions from "../functions"
import { deleteItem, editVocabulary, updateBookmarks } from "../functions"

import { CategoryClass } from "./Category"
import { VocabularyItemStyled } from "./VocabularyItemStyled"

export function VocabularyItemComponent(this: CategoryClass, props: VocabularyItemProps): JSX.Element | null {
  const { vocabularyItem, index } = props
  const { selectedCategory, say, vocabularyCategoryList, selectedLanguage, bookmarks } = this.props
  const {
    selectedTitle,
    arabicTitle,
    deletingIndex
  } = this.state
  const {
    editingVocabularyIndex
  } = this.state
  if (!selectedCategory) {
    return null
  }
  const bookmarkIndex = bookmarks.findIndex((bookmark: BookmarkItem) => bookmark.vocabularyId === vocabularyItem._id)
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
          <QuranIcon data-tip={say.searchQuranVerses} onClick={() => {
            setReduxState({ page: "verses", selectedVocabularyItem: vocabularyItem })
            window.localStorage.setItem("selectedVocabularyItem", JSON.stringify(vocabularyItem))
          }} />
          {bookmarkIndex !== -1 && (
            <BookmarkActiveIcon
              onClick={() => updateBookmarks(bookmarkIndex, selectedCategory._id, vocabularyItem._id)}
            />
          )}
          {bookmarkIndex === -1 && (
            <BookmarkInactiveIcon
              onClick={() => updateBookmarks(bookmarkIndex, selectedCategory._id, vocabularyItem._id)}
            />
          )}
          {!isMultipleCategory && editingVocabularyIndex !== index && (
            <>
              <PencilIcon data-tip={say.edit} onClick={() => this.setState({
                editingVocabularyIndex: index,
                selectedTitle: vocabularyItem.languageItems[selectedLanguage].title,
                arabicTitle: vocabularyItem.languageItems.ar.title,
              })} />
              <DeleteIcon data-tip={say.delete} onClick={() => this.setState({ deletingIndex: index })} />
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
      {deletingIndex === index && (
        <Modal>
          <Modal.Header>{say.askDeleteVocabulary}</Modal.Header>
          <Modal.Body>
            <p>{`${vocabularyItem.languageItems[selectedLanguage].title} - ${vocabularyItem.languageItems.ar.title}`}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="button" onClick={() => this.setState({ deletingIndex: -1 })}>{say.cancel}</div>
            <div className="button" onClick={() => deleteItem(index, () => this.setState({ deletingIndex: -1 }))}>{say.delete}</div>
          </Modal.Footer>
        </Modal>
      )}
    </VocabularyItemStyled>
  )
}
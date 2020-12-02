import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import PlusIcon from "@/images/plus"
import SaveIcon from "@/images/save"
import CloseIcon from "@/images/close"
import MicroIcon from "@/images/micro"
import PlayIcon from "@/images/play"
import DiapoIcon from "@/images/diapo"
import DeleteIcon from "@/images/delete"
import InfinityIcon from "@/images/infinity"
import ImageIcon from "@/images/image"
import NoMicroIcon from "@/images/noMicro"
import ShuffleIcon from "@/images/shuffle"
import { SpeechLanguages, VocabularyItem } from "@/model"
import { Toggle } from "@/ui/components"
import Tooltip from "react-tooltip"

import { CategoryProps, CategoryState, CreatedLanguageItemProps, HarakatProps, VocabularyItemProps } from "../model"
import * as functions from "../functions"

import { CategoryStyled } from "./CategoryStyled"
import { BottomMenuStyled } from "./BottomMenuStyled"
import { BottomMenuItemStyled } from "./BottomMenuItemStyled"
import { DeleteButtonStyled } from "./DeleteButtonStyled"
import { CreatedLanguageItem } from "./CreatedLanguageItem"
import { VocabularyItemComponent } from "./VocabularyItemComponent"
import { Harakat } from "./Harakat"

export const speechLanguages: SpeechLanguages[] = ["fr", "ar", "en"]

export class CategoryClass extends React.Component<CategoryProps, CategoryState> {
  titleSpeech?: SpeechRecognition
  titleRecorder?: any
  titleReader?: FileReader
  audioChanged: boolean = false
  titleChanged: boolean = false
  CreatedLanguageItem: (props: CreatedLanguageItemProps) => JSX.Element
  VocabularyItemComponent: (props: VocabularyItemProps) => JSX.Element | null
  Harakat: (props: HarakatProps) => JSX.Element
  arabicInputRef?: HTMLInputElement | null
  selectedInputRef?: HTMLInputElement | null

  constructor(props: CategoryProps) {
    super(props)
    this.CreatedLanguageItem = CreatedLanguageItem.bind(this)
    this.VocabularyItemComponent = VocabularyItemComponent.bind(this)
    this.Harakat = Harakat.bind(this)
    let state: CategoryState = {
      isMicrophone: true,
      isShuffle: true,
      isDiaporamaImage: true,
      isCreatingWithImage: true,
      isHarakat: true,
      delay: 5,
      editingVocabularyIndex: -1
    } as any

    state = {
      ...state,
      ...functions.getInitialState(),
      isCreatingVocabulary: false,
      isBottomMenuOpened: false,
      isAskingDelete: false
    }

    this.state = state

  }

  componentDidUpdate(oldProps: CategoryProps, oldState: CategoryState): void {
    const { selectedCategory } = this.props
    const { isCreatingVocabulary, editingVocabularyIndex } = this.state
    if (!oldProps.selectedCategory && selectedCategory) {
      this.setState(functions.getInitialState() as unknown as CategoryState)
    }
    if (
      (isCreatingVocabulary && !oldState.isCreatingVocabulary)
      || (editingVocabularyIndex !== -1 && oldState.editingVocabularyIndex === -1)
    ) {
      const input: HTMLInputElement | null = document.querySelector(".selected-language-input") as HTMLInputElement | null
      if (input) {
        input.focus()
      }
    }
  }

  render(): JSX.Element | null {
    const { selectedCategory, say, selectedLanguage } = this.props
    const {
      isCreatingVocabulary,
      isBottomMenuOpened,
      isArabicTitleActive,
      isSelectedTitleActive,
      isMicrophone,
      isShuffle,
      delay,
      isAskingDelete,
      isDiaporamaImage,
      isHarakat,
      selectedTitle,
      arabicTitle,
      isCreatingWithImage,
    } = this.state
    if (!selectedCategory) {
      return null
    }
    const { isMultipleCategory } = selectedCategory
    return (
      <CategoryStyled
        isMultipleCategory={isMultipleCategory}
        onClick={() => {
          if (isBottomMenuOpened) {
            this.setState({ isBottomMenuOpened: false })
          }
          if (isAskingDelete) {
            this.setState({ isAskingDelete: false })
          }
        }}
      >
        {!isMultipleCategory &&
          <div className="add-button-wrapper">
            <div className="add-button" onClick={() => {
              this.setState({
                ...functions.getInitialState(true) as CategoryState,
                isCreatingVocabulary: true,
                editingVocabularyIndex: -1
              })
            }}>
              {say.addVocabulary}
              <PlusIcon />
            </div>
          </div>
        }
        {isCreatingVocabulary && (
          <div className="create-vocabulary-wrapper">
            <div className="create-vocabulary">
              <this.CreatedLanguageItem />
              <this.CreatedLanguageItem isArabic />
              <div className="buttons">
                <Toggle
                  active={isCreatingWithImage}
                  label={say.isWithImage}
                  onChange={() => this.setState({ isCreatingWithImage: !isCreatingWithImage })}
                />
                <div
                  data-for={"save-tooltip"}
                  data-tip
                  className="button"
                  onClick={() => functions.createVocabulary(
                    selectedTitle,
                    arabicTitle,
                    isCreatingWithImage,
                    () => this.setState({ ...functions.getInitialState(true) as unknown as CategoryState, editingVocabularyIndex: -1, })
                  )}
                >
                  <SaveIcon />
                </div>
                <div data-for={"cancel-tooltip"} data-tip={say.cancel} className="button" onClick={() => this.setState({
                  ...functions.getInitialState(true) as CategoryState,
                  isCreatingVocabulary: false,
                })}>
                  <CloseIcon />
                </div>
                <Tooltip id="save-tooltip" effect="solid" place="bottom" getContent={() => say.save} />
                <Tooltip id="cancel-tooltip" effect="solid" place="bottom" getContent={() => say.cancel} />

              </div>
            </div>
          </div>
        )
        }
        <div className="content">
          {selectedCategory.items.map((vocabularyItem: VocabularyItem, index: number) => (
            <this.VocabularyItemComponent key={vocabularyItem._id} vocabularyItem={vocabularyItem} index={index} />
          ))}</div>

        {selectedCategory.items.length > 0 && <BottomMenuStyled>
          {isBottomMenuOpened && (
            <div

              onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                evt.stopPropagation()
                functions.saveDiapositiveSettings(
                  isSelectedTitleActive,
                  isArabicTitleActive,
                  isMicrophone,
                  isShuffle,
                  delay,
                  isDiaporamaImage,
                  isHarakat,
                )
              }}
              className="left-content"
            >
              <BottomMenuItemStyled
                data-tip={say.language.replace("{language}", selectedLanguage)}
                isActive={isSelectedTitleActive}
                onClick={() => this.setState({ isSelectedTitleActive: !isSelectedTitleActive })}
              >
                {selectedLanguage}
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                data-tip={say.language.replace("{language}", "ar")}
                isActive={isArabicTitleActive}
                onClick={() => this.setState({ isArabicTitleActive: !isArabicTitleActive })}
              >
                ar
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={isDiaporamaImage}
                data-tip={say.image}
                onClick={() => this.setState({ isDiaporamaImage: !isDiaporamaImage })}
              >
                <ImageIcon />
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={isHarakat}
                data-tip={say.harakat}
                onClick={() => this.setState({ isHarakat: !isHarakat })}
              >
                {isHarakat ? "حَرَكَات" : "حركات"}
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={isMicrophone}
                data-tip={say.sound}
                onClick={() => this.setState({ isMicrophone: !isMicrophone })}
              >
                {isMicrophone && <MicroIcon />}
                {!isMicrophone && <NoMicroIcon />}
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={isShuffle}
                data-tip={say.shuffle}
                onClick={() => this.setState({ isShuffle: !isShuffle })}
              >
                <ShuffleIcon />
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={true}
                data-tip={say.transitionDelay}
                onClick={() => this.setState({ delay: functions.incrementDelay(delay) })}
              >
                {delay !== false && `${delay} s`}
                {delay === false && <InfinityIcon />}
              </BottomMenuItemStyled>
              <Tooltip effect="solid" place="right" />
            </div>
          )}
          <div
            className="right-content"

            onClick={() => {
              if (!isBottomMenuOpened) {
                this.setState({ isBottomMenuOpened: true })
              } else {
                functions.saveDiapositiveSettings(
                  isSelectedTitleActive,
                  isArabicTitleActive,
                  isMicrophone,
                  isShuffle,
                  delay,
                  isDiaporamaImage,
                  isHarakat,
                  true
                )
              }
            }}
          >
            {!isBottomMenuOpened && <DiapoIcon data-tip={say.diapositiveSettings} />}
            {isBottomMenuOpened && <PlayIcon data-tip={say.playDiapositive} />}
          </div>
        </BottomMenuStyled>}
        {!isMultipleCategory && (
          <DeleteButtonStyled onClick={(evt: React.MouseEvent<HTMLDivElement>) => evt.stopPropagation()} >
            <div className="left-content" onClick={() => this.setState({ isAskingDelete: !isAskingDelete })}>
              <DeleteIcon />
            </div>
            {isAskingDelete && (
              <div className="right-content">
                {say.askDelete}
                <div onClick={() => functions.deleteCategory()}>{say.yes}</div>
              </div>
            )}
          </DeleteButtonStyled>
        )}
        <Tooltip effect="solid" place="left" />
      </CategoryStyled>
    )
  }
}

export const Category = connect((state: ReduxState): CategoryProps => ({
  say: state.say,
  selectedCategory: state.selectedCategory,
  selectedLanguage: state.selectedLanguage,
  vocabularyCategoryList: state.vocabularyCategoryList,
  diapositiveSettings: state.diapositiveSettings,
  bookmarks: state.bookmarks,
}))(CategoryClass)
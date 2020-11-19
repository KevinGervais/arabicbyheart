import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import PlusIcon from "@/images/plus"
import SaveIcon from "@/images/save"
import CloseIcon from "@/images/close"
import MicroIcon from "@/images/micro"
import PlayIcon from "@/images/play"
import DeleteIcon from "@/images/delete"
import DiapoIcon from "@/images/diapo"
import SyncIcon from "@/images/sync"
import InfinityIcon from "@/images/infinity"
import ImageIcon from "@/images/image"
import NoMicroIcon from "@/images/noMicro"
import ShuffleIcon from "@/images/shuffle"
import { SpeechLanguages, VocabularyItem } from "@/model"
import { Toggle } from "@/ui/components"
import Tooltip from "react-tooltip"

import { CategoryInitState, CategoryProps, CategoryState, CreatedLanguageItemProps } from "../model"
import * as functions from "../functions"

import { CategoryStyled } from "./CategoryStyled"
import { VocabularyItemStyled } from "./VocabularyItemStyled"
import { BottomMenuStyled } from "./BottomMenuStyled"
import { BottomMenuItemStyled } from "./BottomMenuItemStyled"
import { DeleteButtonStyled } from "./DeleteButtonStyled"
import { CreatedLanguageItem } from "./CreatedLanguageItem"

export const speechLanguages: SpeechLanguages[] = ["fr", "ar", "en"]

export class CategoryClass extends React.Component<CategoryProps, CategoryState> {
  titleSpeech?: SpeechRecognition
  titleRecorder?: any
  titleReader?: FileReader
  audioChanged: boolean = false
  titleChanged: boolean = false
  setFinalAudio: () => void
  setAudio: (evt: any) => void
  setTitle: (evt: SpeechRecognitionEvent) => void
  createVocabulary: () => void
  deleteItem: (index: number) => void
  goToDiapositive: () => void
  deleteCategory: () => void
  onAudioStop: () => void
  saveDiapositiveSettings: () => void
  getInitialState: (isSkipOptions?: boolean | undefined) => CategoryInitState
  activateAudio: () => void
  CreatedLanguageItem: (props: CreatedLanguageItemProps) => JSX.Element

  constructor(props: CategoryProps) {
    super(props)
    this.setTitle = functions.setTitle.bind(this)
    this.setFinalAudio = functions.setFinalAudio.bind(this)
    this.setAudio = functions.setAudio.bind(this)
    this.getInitialState = functions.getInitialState.bind(this)
    this.createVocabulary = functions.createVocabulary.bind(this)
    this.deleteItem = functions.deleteItem.bind(this)
    this.goToDiapositive = functions.goToDiapositive.bind(this)
    this.deleteCategory = functions.deleteCategory.bind(this)
    this.onAudioStop = functions.onAudioStop.bind(this)
    this.saveDiapositiveSettings = functions.saveDiapositiveSettings.bind(this)
    this.activateAudio = functions.activateAudio.bind(this)
    this.CreatedLanguageItem = CreatedLanguageItem.bind(this)
    let state: CategoryState = {
      isMicrophone: true,
      isShuffle: true,
      isDiaporamaImage: true,
      isCreatingWithImage: true,
      isHarakat: true,
      delay: 5,
    } as any

    state = {
      ...state,
      ...this.getInitialState(),
      isCreatingVocabulary: false,
      isBottomMenuOpened: false,
      recordingLanguage: undefined,
      isAskingDelete: false
    }

    this.state = state

  }

  componentDidUpdate(oldProps: CategoryProps, oldState: CategoryState): void {
    const { selectedCategory } = this.props
    const { recordingLanguage } = this.state
    if (!oldProps.selectedCategory && selectedCategory) {
      this.setState(this.getInitialState() as unknown as CategoryState)
    }

    if (recordingLanguage !== oldState.recordingLanguage && recordingLanguage !== undefined) {
      window.setTimeout(() => {
        if (this.state.recordingLanguage !== undefined) {
          this.onAudioStop()
        }
      }, 10000)
    }
  }

  render(): JSX.Element | null {
    const { selectedCategory, say, vocabularyCategoryList, selectedLanguage } = this.props
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
      isCreatingWithImage,
      isHarakat,
    } = this.state
    if (!selectedCategory) {
      return null
    }
    return (
      <CategoryStyled onClick={() => {
        if (isBottomMenuOpened) {
          this.setState({ isBottomMenuOpened: false })
        }
        if (isAskingDelete) {
          this.setState({ isAskingDelete: false })
        }
      }}>
        <div className="add-button-wrapper">
          <div className="add-button" onClick={() => {
            this.activateAudio()
            this.setState({ isCreatingVocabulary: true })
          }}>
            {say.addVocabulary}
            <PlusIcon />
          </div>
        </div>
        {isCreatingVocabulary && (
          <div className="create-vocabulary-wrapper">
            <div className="create-vocabulary">
              <this.CreatedLanguageItem />
              <this.CreatedLanguageItem isArabic />
              <div>
                <Toggle
                  active={isCreatingWithImage}
                  label={say.isWithImage}
                  onChange={() => this.setState({ isCreatingWithImage: !isCreatingWithImage })}
                />
                <div data-for={"save-tooltip"} data-tip className="button" onClick={this.createVocabulary}>
                  <SaveIcon />
                </div>
                <div data-for={"cancel-tooltip"} data-tip={say.cancel} className="button" onClick={() => this.setState({
                  ...this.getInitialState(true) as CategoryState,
                  isCreatingVocabulary: false,
                  recordingLanguage: undefined,
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
            <VocabularyItemStyled key={vocabularyItem._id}>
              {vocabularyItem.image && (
                <div
                  className="img"
                  onClick={() => functions.updateVocabularyImage(selectedCategory, vocabularyItem, vocabularyCategoryList)}
                >
                  <img src={vocabularyItem.image} alt={vocabularyItem.languageItems.fr.title} />
                  <SyncIcon />
                </div>
              )}
              <div className="vertical-container">
                <div className="item">
                  <span>{selectedLanguage}</span>
                  <h4>{vocabularyItem.languageItems[selectedLanguage].title}</h4>
                  {vocabularyItem.languageItems[selectedLanguage].audio !== "" && <PlayIcon onClick={() => {
                    const audio = new Audio(vocabularyItem.languageItems[selectedLanguage].audio)
                    audio.play()
                  }} />}
                </div>
                <div className="item">
                  <span>ar</span>
                  <h4>{vocabularyItem.languageItems.ar.title}</h4>
                  {vocabularyItem.languageItems.ar.audio !== "" && <PlayIcon onClick={() => {
                    const audio = new Audio(vocabularyItem.languageItems.ar.audio)
                    audio.play()
                  }} />}
                </div>
                <DeleteIcon data-tip={say.delete} onClick={() => this.deleteItem(index)} />
              </div>
            </VocabularyItemStyled>
          ))}</div>

        {selectedCategory.items.length > 0 && <BottomMenuStyled>
          {isBottomMenuOpened && (
            <div

              onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                evt.stopPropagation()
                this.saveDiapositiveSettings()
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
                {selectedLanguage}
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
                this.goToDiapositive()
              }
            }}
          >
            {!isBottomMenuOpened && <DiapoIcon data-tip={say.diapositiveSettings} />}
            {isBottomMenuOpened && <PlayIcon data-tip={say.playDiapositive} />}
          </div>
        </BottomMenuStyled>}
        <DeleteButtonStyled onClick={(evt: React.MouseEvent<HTMLDivElement>) => evt.stopPropagation()} >
          <div className="left-content" onClick={() => this.setState({ isAskingDelete: !isAskingDelete })}>
            <DeleteIcon />
          </div>
          {isAskingDelete && (
            <div className="right-content">
              {say.askDelete}
              <div onClick={this.deleteCategory}>{say.yes}</div>
            </div>
          )}
        </DeleteButtonStyled>
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
  diapositiveSettings: state.diapositiveSettings
}))(CategoryClass)
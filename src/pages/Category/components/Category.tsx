import { ReduxState } from "@/redux/model"
import React from "react"
import { connect } from "react-redux"
import PlusIcon from "@/images/plus"
import SaveIcon from "@/images/save"
import CloseIcon from "@/images/close"
import MicroIcon from "@/images/micro"
import StopIcon from "@/images/stop"
import PlayIcon from "@/images/play"
import DeleteIcon from "@/images/delete"
import DiapoIcon from "@/images/diapo"
import SyncIcon from "@/images/sync"
import InfinityIcon from "@/images/infinity"
import ImageIcon from "@/images/image"
import NoMicroIcon from "@/images/noMicro"
import ShuffleIcon from "@/images/shuffle"
import { SpeechLanguages, VocabularyGroup, VocabularyItem } from "@/model"
import localforage from "localforage"
import { setReduxState } from "@/redux"
import { Toggle } from "@/ui/components"
import { cloneCategory, generateId } from "@/functions"
import Tooltip from "react-tooltip"

import { Select } from "../../../ui/components/Select"
import { CategoryInitState, CategoryProps, CategoryState } from "../model"
import * as functions from "../functions"

import { CategoryStyled } from "./CategoryStyled"
import { VocabularyItemStyled } from "./VocabularyItemStyled"
import { BottomMenuStyled } from "./BottomMenuStyled"
import { BottomMenuItemStyled } from "./BottomMenuItemStyled"
import { DeleteButtonStyled } from "./DeleteButtonStyled"

export const speechLanguages: SpeechLanguages[] = ["fr", "ar", "en"]

export class CategoryClass extends React.Component<CategoryProps, CategoryState> {
  titleSpeech: SpeechRecognition
  titleRecorder: any
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
    let state: CategoryState = {
      isMicrophone: true,
      isShuffle: true,
      isDiaporamaImage: true,
      isCreatingWithImage: true,
      delay: 5,
    } as any

    state = {
      ...state,
      ...this.getInitialState(),
      isCreatingVocabulary: false,
      isBottomMenuOpened: false,
      recordingIndex: -1,
      isAskingDelete: false
    }

    this.state = state

    const speechReco = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    this.titleSpeech = new speechReco()
    this.titleSpeech.continuous = false
    this.titleSpeech.onresult = this.setTitle

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        this.titleRecorder = new (window as any).MediaRecorder(stream)
        this.titleRecorder.addEventListener("dataavailable", this.setAudio)
      })
  }

  componentDidUpdate(oldProps: CategoryProps, oldState: CategoryState): void {
    const { selectedCategory } = this.props
    const { recordingIndex } = this.state
    if (!oldProps.selectedCategory && selectedCategory) {
      this.setState(this.getInitialState() as CategoryState)
    }

    if (recordingIndex !== oldState.recordingIndex && recordingIndex !== -1) {
      window.setTimeout(() => {
        if (this.state.recordingIndex !== -1) {
          this.onAudioStop()
        }
      }, 10000)
    }
  }

  render(): JSX.Element | null {
    const { selectedCategory, say, vocabularyCategoryList } = this.props
    const {
      isCreatingVocabulary,
      isBottomMenuOpened,
      titleList,
      languageList,
      recordingIndex,
      isTitlesFromListActive,
      isMicrophone,
      isShuffle,
      delay,
      isAskingDelete,
      isDiaporamaImage,
      isCreatingWithImage
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
        {!isCreatingVocabulary && <div className="add-button" onClick={() => this.setState({ isCreatingVocabulary: true })}>
          {say.addVocabulary}
          <PlusIcon />
        </div>}
        {isCreatingVocabulary && (
          <div className="create-vocabulary">
            {Array(selectedCategory.columnCount).fill(0).map((_: number, index: number) => (
              <div key={index}>
                <h4>{`${say.vocabularyTitle} ${index + 1}:`}</h4>
                <input
                  placeholder={say.vocabularyPlacehoder}
                  value={titleList[index]}
                  onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
                    if (evt.key.length === 1 && languageList[index] === "ar") {
                      evt.preventDefault()
                      const newTitleList = [...titleList]
                      const key = evt.altKey && evt.key === " " ? "ُ" : functions.latinKeyToArabic(evt.key)
                      newTitleList[index] = newTitleList[index] + key
                      this.setState({ titleList: newTitleList })
                    }
                  }}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    const newTitleList = [...titleList]
                    newTitleList[index] = evt.target.value
                    this.setState({ titleList: newTitleList })
                  }}

                />
                {selectedCategory.items.length > 0 &&
                  <span>{say[languageList[index]]}</span>}
                {recordingIndex !== index && <MicroIcon data-for="record-tooltip" data-tip onClick={() => {
                  this.setState({ recordingIndex: index })
                  this.titleSpeech.lang = languageList[index]
                  try {
                    this.titleRecorder.start()
                    this.titleSpeech.start()
                  } catch (err) {
                    // do nothing
                  }
                }} />}
                <Tooltip id="record-tooltip" effect="solid" place="right" getContent={() => say.record} />

                {recordingIndex === index && <StopIcon onClick={this.onAudioStop} />}
                {selectedCategory.items.length === 0 && <Select
                  optionList={speechLanguages}
                  outputList={speechLanguages.map((lang: SpeechLanguages) => say[lang])}
                  value={say[languageList[index]]}
                  onChange={(newVal: string) => {
                    const newLanguageList = [...languageList]
                    newLanguageList[index] = newVal as SpeechLanguages
                    this.setState({ languageList: newLanguageList })
                  }} />}
              </div>
            ))}
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
                recordingIndex: -1,
              })}>
                <CloseIcon />
              </div>
              <Tooltip id="save-tooltip" effect="solid" place="bottom" getContent={() => say.save} />
              <Tooltip id="cancel-tooltip" effect="solid" place="bottom" getContent={() => say.cancel} />

            </div>
          </div>
        )
        }
        <div className="content">
          {selectedCategory.items.map((vocabularyColumns: VocabularyGroup, index: number) => (
            <VocabularyItemStyled key={vocabularyColumns._id}>
              {vocabularyColumns.image && (
                <div className="img" onClick={() => {
                  const itemTitleList = vocabularyColumns.list.map((item: VocabularyItem) => item.title)
                  functions.getImage(
                    itemTitleList, selectedCategory.languageList, vocabularyColumns.image
                  ).then((image: string | undefined) => {
                    vocabularyColumns.image = image
                    const newVocabularyCategoryList = vocabularyCategoryList.map(cloneCategory)
                    setReduxState({
                      selectedCategory: cloneCategory(selectedCategory),
                      vocabularyCategoryList: newVocabularyCategoryList
                    })
                    localforage.setItem("vocabularyCategoryList", newVocabularyCategoryList)
                  })
                }}>
                  <img src={vocabularyColumns.image} alt={vocabularyColumns.list[0].title} />
                  <SyncIcon />
                </div>
              )}
              <div className="vertical-container">
                {vocabularyColumns.list.map((item: VocabularyItem, columnIndex: number) => (
                  <div key={item._id} className="item">
                    <span>{languageList[columnIndex]}</span>
                    <h4>{item.title}</h4>
                    {item.audio !== "" && <PlayIcon onClick={() => {
                      const audio = new Audio(item.audio)
                      audio.play()
                    }} />}
                  </div>
                ))}
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
              {Array(selectedCategory.columnCount).fill(0).map((_: number, index: number) => {
                const lang = languageList[index]
                const langOccurences = languageList.filter((language: SpeechLanguages) => language === lang).length
                const langIndex = languageList.slice(0, index + 1).filter((language: SpeechLanguages) => language === lang).length
                const dataTip = say.language.replace("{language}", `${say[lang]} ${langOccurences > 1 ? `(${langIndex})` : ""}`)
                return (
                  <BottomMenuItemStyled
                    key={index}
                    data-tip={dataTip}
                    isActive={isTitlesFromListActive[index]}
                    onClick={() => {
                      const newIsTitlesFromListActive = [...isTitlesFromListActive]
                      newIsTitlesFromListActive[index] = !newIsTitlesFromListActive[index]
                      this.setState({ isTitlesFromListActive: newIsTitlesFromListActive })
                    }}
                  >
                    {`${lang} ${langOccurences > 1 ? langIndex : ""}`}
                  </BottomMenuItemStyled>
                )
              })}
              <BottomMenuItemStyled
                isActive={isDiaporamaImage}
                data-tip={say.image}
                onClick={() => this.setState({ isDiaporamaImage: !isDiaporamaImage })}
              >
                <ImageIcon />
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
  vocabularyCategoryList: state.vocabularyCategoryList,
  diapositiveSettings: state.diapositiveSettings
}))(CategoryClass)
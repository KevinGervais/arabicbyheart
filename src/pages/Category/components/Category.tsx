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
import InfinityIcon from "@/images/infinity"
import NoMicroIcon from "@/images/noMicro"
import ShuffleIcon from "@/images/shuffle"
import { SpeechLanguages, VocabularyGroup, VocabularyItem } from "@/model"

import { Select } from "../../../ui/components/Select"
import { CategoryProps, CategoryState } from "../model"
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
  getInitialState: (isSkipLanguage?: boolean | undefined) => CategoryState
  setFinalAudio: () => void
  setAudio: (evt: any) => void
  setTitle: (evt: SpeechRecognitionEvent) => void
  createVocabulary: () => void
  getImage: () => Promise<string>
  deleteItem: (index: number) => void
  goToDiapositive: () => void
  deleteCategory: () => void
  onAudioStop: () => void

  constructor(props: CategoryProps) {
    super(props)
    this.setTitle = functions.setTitle.bind(this)
    this.setFinalAudio = functions.setFinalAudio.bind(this)
    this.setAudio = functions.setAudio.bind(this)
    this.getInitialState = functions.getInitialState.bind(this)
    this.createVocabulary = functions.createVocabulary.bind(this)
    this.getImage = functions.getImage.bind(this)
    this.deleteItem = functions.deleteItem.bind(this)
    this.goToDiapositive = functions.goToDiapositive.bind(this)
    this.deleteCategory = functions.deleteCategory.bind(this)
    this.onAudioStop = functions.onAudioStop.bind(this)
    this.state = {
      ...this.getInitialState(),
      isMicrophone: true,
      isShuffle: true,
      delay: 5,
      isCreatingVocabulary: false,
      isBottomMenuOpened: false,
      recordingIndex: -1,
      isAskingDelete: false

    }

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
      this.setState(this.getInitialState())
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
    const { selectedCategory, say } = this.props
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
      isAskingDelete
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
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    const newTitleList = [...titleList]
                    newTitleList[index] = evt.target.value
                    this.setState({ titleList: newTitleList })
                  }}
                />
                {recordingIndex !== index && <MicroIcon onClick={() => {
                  this.setState({ recordingIndex: index })
                  this.titleSpeech.lang = languageList[index]
                  try {
                    this.titleRecorder.start()
                    this.titleSpeech.start()
                  } catch (err) {
                    // do nothing
                  }
                }} />}
                {recordingIndex === index && <StopIcon onClick={this.onAudioStop} />}
                <Select
                  optionList={speechLanguages}
                  outputList={speechLanguages.map((lang: SpeechLanguages) => say[lang])}
                  value={languageList[index]}
                  onChange={(newVal: string) => {
                    const newLanguageList = [...languageList]
                    newLanguageList[index] = newVal as SpeechLanguages
                    this.setState({ languageList: newLanguageList })
                  }} />
              </div>
            ))}
            <div>
              <div className="button" onClick={this.createVocabulary}>
                <SaveIcon />
              </div>
              <div className="button" onClick={() => this.setState({
                ...this.getInitialState(true),
                isCreatingVocabulary: false,
                recordingIndex: -1,
              })}>
                <CloseIcon />
              </div>
            </div>
          </div>
        )
        }
        <div className="content">
          {selectedCategory.items.map((vocabularyColumns: VocabularyGroup, index: number) => (
            <VocabularyItemStyled key={vocabularyColumns._id}>
              {vocabularyColumns.list.map((item: VocabularyItem) => (
                <div key={item._id} className="item">
                  <span>{item.lang}</span>
                  <h4>{item.title}</h4>
                  <PlayIcon onClick={() => {
                    const audio = new Audio(item.audio)
                    audio.play()
                  }} />
                </div>
              ))}
              <DeleteIcon onClick={() => this.deleteItem(index)} />
            </VocabularyItemStyled>
          ))}</div>

        <BottomMenuStyled>
          {isBottomMenuOpened && (
            <div
              onClick={(evt: React.MouseEvent<HTMLDivElement>) => evt.stopPropagation()}
              className="left-content"
            >
              {Array(selectedCategory.columnCount).fill(0).map((_: number, index: number) => (
                <BottomMenuItemStyled
                  key={index}
                  isActive={isTitlesFromListActive[index]}
                  onClick={() => {
                    const newIsTitlesFromListActive = [...isTitlesFromListActive]
                    newIsTitlesFromListActive[index] = !newIsTitlesFromListActive[index]
                    this.setState({ isTitlesFromListActive: newIsTitlesFromListActive })
                  }}
                >
                  {`${say.vocabularyTitle} ${index + 1}`}
                </BottomMenuItemStyled>
              ))}
              <BottomMenuItemStyled
                isActive={isMicrophone}
                onClick={() => this.setState({ isMicrophone: !isMicrophone })}
              >
                {isMicrophone && <MicroIcon />}
                {!isMicrophone && <NoMicroIcon />}
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={isShuffle}
                onClick={() => this.setState({ isShuffle: !isShuffle })}
              >
                <ShuffleIcon />
              </BottomMenuItemStyled>
              <BottomMenuItemStyled
                isActive={true}
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
            {!isBottomMenuOpened && <DiapoIcon />}
            {isBottomMenuOpened && <PlayIcon />}
          </div>
        </BottomMenuStyled>
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
      </CategoryStyled >
    )
  }
}

export const Category = connect((state: ReduxState): CategoryProps => ({
  say: state.say,
  selectedCategory: state.selectedCategory,
  vocabularyCategoryList: state.vocabularyCategoryList,
  diapositiveSettings: state.diapositiveSettings
}))(CategoryClass)
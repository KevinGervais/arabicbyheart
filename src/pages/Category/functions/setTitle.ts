import { CategoryClass } from "../components/Category"
import { CategoryState } from "../model"

export function setTitle(this: CategoryClass, evt: SpeechRecognitionEvent): void {
  const { titleList, recordingIndex } = this.state
  const speech = evt.results[0][0].transcript
  const newTitleList = [...titleList]
  newTitleList[recordingIndex] = speech
  this.titleChanged = true
  const newState: Partial<CategoryState> = {
    titleList: newTitleList
  }
  if (this.audioChanged) {
    newState.recordingIndex = -1
  }
  this.setState(newState as CategoryState)
}
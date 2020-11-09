import { CategoryClass } from "../components/Category"
import { CategoryState } from "../model"

export function setFinalAudio(this: CategoryClass): void {
  const { audioList, recordingIndex } = this.state
  const base64: string = (this.titleReader as FileReader).result as string
  const newAudioList = [...audioList]
  newAudioList[recordingIndex] = base64
  this.audioChanged = true
  const newState: Partial<CategoryState> = {
    audioList: newAudioList
  }
  if (this.titleChanged) {
    newState.recordingIndex = -1
  }
  this.setState(newState as CategoryState)
}
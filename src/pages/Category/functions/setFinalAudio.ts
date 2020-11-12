import { CategoryClass } from "../components/Category"

export function setFinalAudio(this: CategoryClass): void {
  const { audioList, recordingIndex } = this.state
  const base64: string = (this.titleReader as FileReader).result as string
  const newAudioList = [...audioList]
  newAudioList[recordingIndex] = base64
  this.audioChanged = true

  if (this.titleChanged) {
    this.setState({ recordingIndex: -1, audioList: newAudioList })
  } else {
    this.setState({ audioList: newAudioList })
  }
}
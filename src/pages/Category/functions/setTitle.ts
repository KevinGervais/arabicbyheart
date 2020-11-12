import { CategoryClass } from "../components/Category"

export function setTitle(this: CategoryClass, evt: SpeechRecognitionEvent): void {
  const { titleList, recordingIndex } = this.state
  const speech = evt.results[0][0].transcript
  const newTitleList = [...titleList]
  newTitleList[recordingIndex] = speech
  this.titleChanged = true
  if (this.audioChanged) {
    this.setState({ recordingIndex: -1, titleList: newTitleList })
  } else {
    this.setState({ titleList: newTitleList })
  }
}
import { CategoryClass } from "../components/Category"

export function setTitle(this: CategoryClass, evt: SpeechRecognitionEvent): void {
  const { recordingLanguage } = this.state
  const speech = evt.results[0][0].transcript
  this.titleChanged = true
  const state: any = {}
  if (recordingLanguage === "ar") {
    state.arabicTitle = speech
  } else {
    state.selectedTitle = speech
  }
  if (this.audioChanged) {
    this.setState({ recordingIndex: undefined, ...state })
  } else {
    this.setState(state)
  }
}
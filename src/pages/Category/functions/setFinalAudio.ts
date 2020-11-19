import { CategoryClass } from "../components/Category"

export function setFinalAudio(this: CategoryClass): void {
  const { recordingLanguage } = this.state
  const base64: string = (this.titleReader as FileReader).result as string
  this.audioChanged = true
  const state: any = {}
  if (recordingLanguage === "ar") {
    state.arabicAudio = base64
  } else {
    state.selectedAudio = base64
  }
  if (this.titleChanged) {
    this.setState({ recordingLanguage: undefined, ...state })
  } else {
    this.setState({ ...state })
  }
}
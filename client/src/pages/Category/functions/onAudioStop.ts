import { CategoryClass } from "../components/Category"

export function onAudioStop(this: CategoryClass): void {
  const { recordingLanguage } = this.state
  this.audioChanged = false
  this.titleChanged = false
  try {
    this.titleRecorder.stop()
    if (this.titleSpeech) {
      this.titleSpeech.stop()
    }
  } catch (err) {
    // do nothing
  }
  window.setTimeout(() => {
    if (recordingLanguage !== undefined) {
      this.setState({ recordingLanguage: undefined })
    }
  }, 500)
}
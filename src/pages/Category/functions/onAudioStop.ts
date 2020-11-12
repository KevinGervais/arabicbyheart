import { CategoryClass } from "../components/Category"

export function onAudioStop(this: CategoryClass): void {
  const { recordingIndex } = this.state
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
    if (recordingIndex !== -1) {
      this.setState({ recordingIndex: -1 })
    }
  }, 500)
}
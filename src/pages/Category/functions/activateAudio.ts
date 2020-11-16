import { CategoryClass } from "../components/Category"

export function activateAudio(this: CategoryClass): void {
  if (!this.titleSpeech) {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      this.titleSpeech = new SpeechRecognition()
      this.titleSpeech.continuous = false
      this.titleSpeech.onresult = this.setTitle
    }
  }
  if (
    !this.titleRecorder
    && (window as any).MediaRecorder
    && navigator.mediaDevices
    && navigator.mediaDevices.getUserMedia
  ) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        this.titleRecorder = new (window as any).MediaRecorder(stream)
        this.titleRecorder.addEventListener("dataavailable", this.setAudio)
      })
  }
}
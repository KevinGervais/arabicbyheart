import { CategoryClass } from "../components/Category"

export function setAudio(this: CategoryClass, evt: any): void {
  const audioBlob = new Blob([evt.data], { type: 'audio/ogg' })
  this.titleReader = new window.FileReader()
  this.titleReader.readAsDataURL(audioBlob)
  this.titleReader.onloadend = this.setFinalAudio
}
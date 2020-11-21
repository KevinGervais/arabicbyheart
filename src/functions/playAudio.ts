export function playAudio(base64Audio: string): void {
  try {
    const AudioPLayer = Audio || (window as any).webkitAudio
    if (AudioPLayer) {
      const audio = new Audio(base64Audio)
      audio.play()
    }
  } catch (err) {
    console.log(err)
  }
}
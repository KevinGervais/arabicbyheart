import { SpeechLanguages } from "@/model"

export function playAudio(text: string, lang: SpeechLanguages): void {
  try {
    if (lang === "ar") {
      console.log(window.responsiveVoice.speak(text, "Arabic Female", { rate: 0.75, pitch: 1, volume: 1.5 }))
    } else {
      const Utterance = SpeechSynthesisUtterance
      const speech = speechSynthesis
      const utterance = new Utterance(text)
      utterance.lang = lang
      utterance.rate = 0.75
      utterance.volume = 1.5
      speech.speak(utterance)
    }
  } catch (err) {
    console.log(err)
  }
}
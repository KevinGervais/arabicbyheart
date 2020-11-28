import { SpeechLanguages } from "@/model"

export function playAudio(text: string, lang: SpeechLanguages): void {
  try {
    if (lang === "ar") {
      console.log(window.responsiveVoice.speak(text, "Arabic Male", { rate: 0.75 }))
    } else {
      const Utterance = SpeechSynthesisUtterance || (window as any).WebkitSpeechSynthesisUtterance
      const speech = speechSynthesis || (window as any).WebkitSpeechSynthesis
      const utterance = new Utterance(text)
      utterance.lang = lang
      utterance.rate = 0.75
      speech.speak(utterance)
    }
  } catch (err) {
    console.log(err)
  }
}
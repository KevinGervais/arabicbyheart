export function removeHarakat(arabic: string): string {
  return arabic
    .split("َ").join("")
    .split("ُ").join("")
    .split("ِ").join("")
    .split("ََ").join("")
    .split("ُُ").join("")
    .split("ِِ").join("")
    .split("ْ").join("")
    .split("ّ").join("")
    .split("أ").join("ا")
    .split("إ").join("ا")
}
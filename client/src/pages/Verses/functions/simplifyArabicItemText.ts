export function simplifyArabicItemText(arabic: string): string {
  let keyWord: string = arabic
    .split("(").join("")
    .split(")").join("")
    .split("+").join("")
    .trim()
  if (keyWord.startsWith("ـ")) {
    keyWord = `${keyWord} `
  } else if (keyWord.endsWith("ـ")) {
    keyWord = ` ${keyWord}`
  } else {
    keyWord = ` ${keyWord} `
  }
  keyWord.split("ـ").join("")
  return keyWord
}
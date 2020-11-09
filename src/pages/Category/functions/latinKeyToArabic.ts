export function latinKeyToArabic(key: string): string {
  const keyMap: any = {
    q: 'ق',
    w: 'ش',
    e: 'ع',
    r: 'ر',
    t: 'ت',
    y: 'ط',
    u: 'و',
    i: 'ي',
    o: 'ه',
    p: 'ة',
    ç: 'ث',
    à: 'ظ',
    "a": "ا",
    "s": "س",
    "d": "د",
    "f": "ف",
    "g": "غ",
    "h": "ح",
    "j": "ج",
    "k": "ك",
    "l": "ل",
    ";": "؛",
    "è": "'",
    "z": "ز",
    "x": "خ",
    "c": "ص",
    "v": "ذ",
    "b": "ب",
    "n": "ن",
    "m": "م",
    ",": "،",
    ".": ".",
    "é": "\\",
    "Q": "ڤ",
    "W": " ّ",
    "E": "غ",
    "R": "ز",
    "T": "ث",
    "Y": "ظ",
    "U": "ے",
    "I": "ى",
    "O": "ة",
    "P": "ت",
    "Ç": "}",
    "À": "{",
    "A": "إ",
    "S": "آ",
    "D": "ش",
    "F": "ذ",
    "G": "ق",
    "H": "ع",
    "J": "خ",
    "K": "چ",
    "L": "گ",
    ":": "❊",
    "È": ":",
    "Z": '"',
    "X": "ژ",
    "C": "ح",
    "V": "ض",
    "B": "د",
    "N": "پ",
    "M": "ث",
    "'": "آ",
    "É": ">",
    "œ": "<",
    "∑": "؟",
    "∂": "ڤ",
    "¶": " ّ",
    "™": "ی",
    "¥": "غ",
    " ": "ط",
    "π": "ث",
    "ø": " ُ",
    "“": " ِ",
    "~": " ْ",
    "`": " ّ",
    "æ": "]",
    "ß": "[",
    "ª": "أ",
    "ƒ": " َ",
    "©": "ص",
    "˙": "ض",
    "∆": "ڤ",
    "˚": "ع",
    " ": "ه",
    "°": "خ",
    "\\": "خ",
    "«": "ٱ",
    "»": "ظ",
    "¢": "ح",
    "√": "ث",
    "∫": "ظ",
    "µ": "آ",
    "<": "»",
    ">": "«",
    "/": "/",
    "ù": "ـ",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
    "0": "٠",
    "-": "-",
    "=": "=",
    "Ù": "ـ",
    "!": "!",
    "@": "ء",
    "#": "أ",
    "$": "آ",
    "%": "إ",
    "?": "ئ",
    "&": "ؤ",
    "*": "ى",
    "(": ")",
    ")": "(",
    "_": "_",
    "+": "+",
    "£": "#",
    "€": "$",
    "∞": "٪",
    "{": "^",
    "}": "*",
    "[": ")",
    "]": "(",
    "|": "_",
    "¬": "+",
  }
  return keyMap[key] || key
}
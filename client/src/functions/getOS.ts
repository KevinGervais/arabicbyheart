let os: | "mac"
  | "windows"
  | "ios"
  | "android"
  | "linux"
  | undefined

export function getOS():
  | "mac"
  | "windows"
  | "ios"
  | "android"
  | "linux" {
  if (os !== undefined) {
    return os
  }
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"]
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"]
  const iosPlatforms = ["iPhone", "iPad", "iPod"]
  if (macosPlatforms.includes(platform)) {
    os = "mac"
    return "mac"
  } else if (iosPlatforms.includes(platform)) {
    os = "ios"
    return "ios"
  } else if (windowsPlatforms.includes(platform)) {
    os = "windows"
    return "windows"
  } else if (/Android/.test(userAgent)) {
    os = "android"
    return "android"
  } else if (/Linux/.test(platform)) {
    os = "linux"
    return "linux"
  } else {
    os = "windows"
    return "windows"
  }
}

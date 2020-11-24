import Bowser from "bowser"
export function getBrowser(): "Chrome" | string {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getBrowserName()
}
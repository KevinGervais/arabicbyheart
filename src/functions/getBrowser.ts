import Bowser from "bowser"
export function getBrowser(): string {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getBrowserName()
}
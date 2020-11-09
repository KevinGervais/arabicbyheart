
import { UiReduxInitState } from "./model"
import { PageNames } from "./routes/model"

export const uiReduxInitState: UiReduxInitState = {
  page: (window.localStorage.getItem("page") || "home") as PageNames,
  notchPosition: undefined
}

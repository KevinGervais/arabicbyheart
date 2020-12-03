
import { PageNames } from "../routes/model"

import { UiReduxInitState } from "./model"

export const uiReduxInitState: UiReduxInitState = {
  page: (window.localStorage.getItem("page") || "home") as PageNames,
  notchPosition: undefined
}

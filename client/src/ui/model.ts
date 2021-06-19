import { NotchPosition } from "@/model"

import { PageNames } from "../routes/model"

export interface UiReduxInitState {
  readonly page: PageNames,
  readonly notchPosition: NotchPosition
  readonly isDarkMode: boolean
}

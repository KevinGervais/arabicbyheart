import { NotchPosition } from "@/model"

import { PageNames } from "./routes/model"

export interface UiReduxInitState {
  page: PageNames,
  notchPosition: NotchPosition
}

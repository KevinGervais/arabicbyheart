import { store } from "./store"
import { ReduxState } from "./model"

export { setReduxState } from "./actions"
export { initState } from "./initState"
export { store } from "./store"

export const getReduxState: () => ReduxState = store.getState

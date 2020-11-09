import { ReduxState } from "./model"
import { store } from "./store"

export function setReduxState(this: any, object: Partial<ReduxState>): void {
  if (this && this.props && this.props.dispatch) {
    this.props.dispatch({
      type: "SET",
      data: object
    })
  } else {
    store.dispatch({
      type: "SET",
      data: object
    })
  }
}

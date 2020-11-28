import { combineReducers } from "redux"
import settingsReducer from "store/entities/settings"

export default combineReducers({
  settings: settingsReducer,
})

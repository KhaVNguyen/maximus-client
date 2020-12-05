import { combineReducers } from "redux"
import lobbyReducer from "store/entities/lobby"
import settingsReducer from "store/entities/settings"

export default combineReducers({
  lobby: lobbyReducer,
  settings: settingsReducer,
})

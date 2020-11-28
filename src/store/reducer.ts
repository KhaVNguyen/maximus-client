import { combineReducers } from "redux"
import entitiesReducer from "store/entities"

const rootReducer = combineReducers({
  entities: entitiesReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

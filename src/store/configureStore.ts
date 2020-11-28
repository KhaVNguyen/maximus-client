import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import reducer from "store/reducer"

export default function (): any {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
  })
}

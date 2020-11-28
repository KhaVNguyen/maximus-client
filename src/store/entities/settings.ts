import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store/reducer"

interface SettingsSliceState {
  name: string
}
const initialState: SettingsSliceState = {
  name: "",
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setName: (settings, action: PayloadAction<string>) => {
      settings.name = action.payload
    },
  },
})

export const getName = (state: RootState): string =>
  state.entities.settings.name

export const { setName } = settingsSlice.actions
export default settingsSlice.reducer

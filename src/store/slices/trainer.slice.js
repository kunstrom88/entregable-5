import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
  name:'trainer',
  initialState: localStorage.getItem("trainer") ?? "",
  reducers: {
    setTrainerGlobal: (state, action) => {
      localStorage.setItem("trainer", action.payload)
      return action.payload;
    },
    logOut: () => {
      localStorage.removeItem("trainer")
      return ""
    }
  }
})

export const { setTrainerGlobal, logOut } = trainerSlice.actions

export default trainerSlice.reducer
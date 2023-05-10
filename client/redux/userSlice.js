import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    id: null,
    location: null,
  },
  reducers: {
    SetUser: (state, action) => {
      let { email, id } = action.payload;
      state.email = email;
      state.id = id;
    },
    SetLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { SetUser, SetLocation } = userSlice.actions;

export default userSlice.reducer;

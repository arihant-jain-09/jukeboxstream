import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    id: null,
    accessToken: null,
    location: null,
  },
  reducers: {
    SetUser: (state, action) => {
      console.log(action.payload);
      let { email, id, accessToken } = action.payload;
      state.email = email;
      state.id = id;
      state.accessToken = accessToken;
    },
    SetLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { SetUser, SetLocation } = userSlice.actions;

export default userSlice.reducer;

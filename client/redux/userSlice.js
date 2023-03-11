import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    id: null,
  },
  reducers: {
    SetUser: (state, action) => {
      let { email, id } = action.payload;
      state.email = email;
      state.id = id;
    },
  },
});

export const { SetUser } = userSlice.actions;

export default userSlice.reducer;

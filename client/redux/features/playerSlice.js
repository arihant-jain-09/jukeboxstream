import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    allSongs: [],
    currentSongs: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    isActive: false,
    activeSong: {},
    genreList: [],
  },
  reducers: {
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetCurrentSongs: (state, action) => {
      state.currentSongs = action.payload;
    },

    SetActiveSong: (state, action) => {
      state.activeSong = action.payload;
      // state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    SetNextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    SetPrevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    SetCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    // SetSelectedPlaylist: (state, action) => {
    //   state.selectedPlaylist = action.payload;
    // },
    // SetSelectedPlaylistForEdit: (state, action) => {
    //   state.selectedPlaylistForEdit = action.payload;
    // },
    SetIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    SetCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const {
  SetAllSongs,
  SetActiveSong,
  SetCurrentIndex,
  SetCurrentSongs,
  SetNextSong,
  SetPrevSong,
  // SetSelectedPlaylist,
  // SetSelectedPlaylistForEdit,
  SetIsPlaying,
  SetCurrentTime,
} = playerSlice.actions;

export default playerSlice.reducer;

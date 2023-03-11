import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    allSongs: [],
    tempAllSongs: [],
    currentSong: null,
    currentSongIndex: 0,
    selectedPlaylist: null,
    selectedPlaylistForEdit: null,
    isPlaying: false,
    currentTime: 0,
  },
  reducers: {
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    SetCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    SetSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    SetSelectedPlaylistForEdit: (state, action) => {
      state.selectedPlaylistForEdit = action.payload;
    },
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
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetIsPlaying,
  SetCurrentTime,
} = itemSlice.actions;

export default itemSlice.reducer;

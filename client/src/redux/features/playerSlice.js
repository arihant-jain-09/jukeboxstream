import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    allSongs: [],
    currentSongs: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    isActive: false,
    activeSong: {},
    genreList: [],
    colors: {},
    m3u8: {},
    musicQ: [],
    totalSongCount: 0,
  },
  reducers: {
    equeueTrack: (state, action) => {
      const songIndex = state.allSongs.findIndex(
        (song) => song.id === action.payload
      );
      if (songIndex !== -1) {
        const updatedList = [...state.allSongs];
        const songToAdd = updatedList.splice(songIndex, 1)[0];
        state.totalSongCount--;
        console.log('Song is present in the list');
        console.log('The song ' + songToAdd.title.S);
        state.musicQ = [...state.musicQ, { song: songToAdd, index: songIndex }];
      } else {
        console.log('Song not found');
      }
    },

    dequeueTrack: (state, action) => {
      const indexToRemove = action.payload;
      if (
        state.musicQ.length > 0 &&
        indexToRemove >= 0 &&
        indexToRemove < state.musicQ.length
      ) {
        const removedSong = state.musicQ.splice(indexToRemove, 1)[0];
        state.allSongs.splice(removedSong.index, 0, removedSong.song);
        state.totalSongCount++;
        console.log('Dequeued the song ' + removedSong.song.title);
      } else {
        console.log('Invalid index or queue is empty');
      }
    },

    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
      state.totalSongCount = action.payload.length;
    },
    SetCurrentSongs: (state, action) => {
      state.currentSongs = action.payload;
    },

    SetActiveSong: (state, action) => {
      state.activeSong = action.payload;
      // state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    playNextTrack: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.musicQ.length;
    },
    playPreviousTrack: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + state.musicQ.length) % state.musicQ.length;
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
    SetColors: (state, action) => {
      state.colors = action.payload;
    },
    SetData: (state, action) => {
      state.m3u8 = action.payload;
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
  SetColors,
  SetData,
} = playerSlice.actions;

export default playerSlice.reducer;

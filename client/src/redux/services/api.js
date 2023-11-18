import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASEURL}/api/`,
    prepareHeaders: (headers) => {
      //   headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    // getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
    // getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
    // getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    // getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
    getSongDetails: builder.query({
      query: ({ id }) => `streams/${id}`,
    }),
    getUserSongDetails: builder.query({
      query: ({ id, userId }) => `streams/${id}?userId=${userId}`,
    }),
    // getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
  }),
});

export const {
  //   useGetTopChartsQuery,
  //   useGetSongsByGenreQuery,
  //   useGetSongsByCountryQuery,
  //   useGetSongsBySearchQuery,
  //   useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetUserSongDetailsQuery,
  //   useGetSongRelatedQuery,
} = API;

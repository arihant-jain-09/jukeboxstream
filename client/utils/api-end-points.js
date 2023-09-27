// const BASEAPI = "http://localhost:5000/api";
export const BASEAPI = `${process.env.NEXT_PUBLIC_BASEURL}`;
console.log(BASEAPI);

/**
 * REDIS ROUTES
 */

// ------------ SONG ---------------
export const INCREASE_SONG_LIKES = `/api/song/likes/incr`;
export const DECREASE_SONG_LIKES = `/api/song/likes/decr`;
export const INCR_SONG_VIEW = `${BASEAPI}/api/song/view/incr`;
export const FILTER_SONG_BY = `${BASEAPI}/api/song/filter`;

// ------------ LIKES ---------------
export const GET_USER_LIKES = `/api/likes/user`;

// /------------------------------------------------------------/

/**
 * ROUTES
 */
// ------------ STREAMS ------------
export const BASE_GET_SONG = `/api/streams`;
export const GET_ALL_SONGS = `/api/streams/all`;

// ------------ SONG ---------------
export const BASE_GET_SONG_COLOR = `/api/song/colors`;

// ------------ UPLOAD ---------------
export const BASE_UPLOAD_IMAGE = `/api/upload/files`;

// ------------ LOCATION ---------------
export const BASE_LOCATION_ROUTE = `${BASEAPI}/api/location`;

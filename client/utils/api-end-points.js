// const BASEAPI = "http://localhost:5000/api";
const BASEAPI = `${process.env.NEXT_PUBLIC_BASEURL}`;
console.log(BASEAPI);

/**
 * REDIS ROUTES
 */
export const INCREASE_SONG_LIKES = `${BASEAPI}/api/song/likes/incr`;
export const DECREASE_SONG_LIKES = `${BASEAPI}/api/song/likes/decr`;
export const GET_USER_LIKES = `${BASEAPI}/api/likes/user`;

export const FILTER_SONG_BY = `${BASEAPI}/api/song/filter`;

export const INCR_SONG_VIEW = `${BASEAPI}/api/song/view/incr`;

// /------------------------------------------------------------/

/**
 * ROUTES
 */
export const BASE_GET_SONG = `${BASEAPI}/api/streams`;
export const GET_ALL_SONGS = `${BASEAPI}/api/streams/all`;
export const BASE_GET_SONG_COLOR = `${BASEAPI}/api/song/colors`;
export const BASE_UPLOAD_IMAGE = `${BASEAPI}/api/upload/files`;
export const BASE_LOCATION_ROUTE = `${BASEAPI}/api/location`;
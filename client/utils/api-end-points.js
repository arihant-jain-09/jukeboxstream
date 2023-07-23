// const BASEAPI = "http://localhost:5000/api";
const BASEAPI = `${process.env.NEXT_PUBLIC_BASEURL}/api`;

/**
 * REDIS ROUTES
 */
export const INCREASE_SONG_LIKES = `${BASEAPI}/song/likes/incr`;
export const DECREASE_SONG_LIKES = `${BASEAPI}/song/likes/decr`;
export const GET_USER_LIKES = `${BASEAPI}/likes/user`;

export const FILTER_SONG_BY = `${BASEAPI}/song/filter`;

export const INCR_SONG_VIEW = `${BASEAPI}/song/view/incr`;

// /------------------------------------------------------------/

/**
 * ROUTES
 */
export const BASE_GET_SONG = `${BASEAPI}/streams`;
export const GET_ALL_SONGS = `${BASEAPI}/streams/all`;
export const BASE_GET_SONG_COLOR = `${BASEAPI}/song/colors`;
export const BASE_UPLOAD_IMAGE = `${BASEAPI}/upload/files`;
export const BASE_LOCATION_ROUTE = `${BASEAPI}/location`;
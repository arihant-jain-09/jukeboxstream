import { BASE_GET_SONG } from "../utils/api-end-points";
import http from "./HttpService";
export function getM3u8(itemId) {
  return http.get(`${BASE_GET_SONG}/${itemId}`);
}

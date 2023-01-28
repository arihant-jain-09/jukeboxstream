import http from "./HttpService";
export function getM3u8(itemId) {
  return http.get(`http://localhost:5000/api/streams/${itemId}`);
}

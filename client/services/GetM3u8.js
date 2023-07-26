import { BASEAPI, BASE_GET_SONG } from "../utils/api-end-points";
import awsconfig from "../aws-exports"
import http from "./HttpService";
export function getM3u8(itemId) {
  if(process.env.NEXT_PUBLIC_ENV == "dev"){
    return http.get(`${BASEAPI}/${BASE_GET_SONG}/${itemId}`);
  }
  else{
    const arr_of_routes = awsconfig.aws_cloud_logic_custom
    const endpoint = arr_of_routes.filter((route)=>route.name=="streams")[0].endpoint
    return http.get(`${endpoint}/${BASE_GET_SONG}/${itemId}`);
  }
  
}

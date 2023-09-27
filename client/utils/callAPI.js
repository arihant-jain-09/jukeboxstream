import axios from 'axios';
import awsconfig from '../aws-exports';
import { BASEAPI } from './api-end-points';

const ENV = process.env.NEXT_PUBLIC_ENV;

export const GETAPI = async (path, name) => {
  if (ENV == 'dev') {
    const { data } = await axios.get(BASEAPI + path);
    return data;
  } else {
    const arr_of_routes = awsconfig.aws_cloud_logic_custom;
    const endpoint = arr_of_routes.filter((route) => route.name == name)[0]
      .endpoint;
    const { data } = await axios.get(endpoint + path);
    return data;
  }
};

export const POSTAPI = async (path, args, name) => {
  console.log(args);
  if (ENV == 'dev') {
    const { data } = await axios.post(BASEAPI + path, args);
    return data;
  } else {
    const arr_of_routes = awsconfig.aws_cloud_logic_custom;
    console.log(arr_of_routes);
    const endpoint = arr_of_routes.filter((route) => route.name == name)[0]
      .endpoint;
    console.log(endpoint);
    const { data } = await axios.post(endpoint + path, args);
    return data;
  }
};
// const callAPI = async (path,type,name=null) => {
//   if(ENV == "dev"){
//     if(type=="POST"){
//       const {data} = await axios.post(path);
//       return data
//     }
//     const {data} = axios.get(path);
//     return data;
//   }
//   else{
//     const arr_of_routes = awsconfig.aws_cloud_logic_custom
//     const endpoint = arr_of_routes.filter((route)=>route.name==name)[0].endpoint
//     if(type=="POST"){
//       const {data} = await axios.post( endpoint + path);
//       return data
//     }
//     const {data} = await axios.get( endpoint + path);
//     return data
//   }
// }

// export default callAPI

import $api from './api';
import $url from './config';


export const demoRequest = (data) => $api.post($url, data)
// .then((res)=>{
//
// })
// .catch((err)=>{
//
//
//   });
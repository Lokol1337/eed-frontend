import $api from './api';
import $url from './config';


export const demoRequest = (data) => $api.post($url, data)
// .then((res)=>{
//     console.log("AXIOS: " +  res.data);
// })
// .catch((err)=>{
//     console.log(data);
//     console.log("AXIOS: " +  err);
//   });
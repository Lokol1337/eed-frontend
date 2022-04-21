import axios from "axios";

const $api = axios.create({
  baseURL: 'http://51.195.16.17:3000',
});

export default $api;
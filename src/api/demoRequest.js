import $api from './api';

export const demoRequest = (data) => $api.post('http://localhost:8080/someEndpoint', data) 
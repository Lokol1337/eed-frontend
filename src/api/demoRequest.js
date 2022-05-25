import $api from './api';

export const demoRequest = (data) => $api.post('/someEndpoint', data) 
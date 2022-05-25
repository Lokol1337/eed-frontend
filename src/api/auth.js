import $api from './api';

const createUserFormData = (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  return formData;
}

export const login = (email, password) => {
  const formData = createUserFormData(email, password);
  return $api.post('/token', formData);
}
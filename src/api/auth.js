import $api from './api';

const createUserFormData = (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  return formData;
}

export const login = (email, password) => {
  const formData = createUserFormData(email, password);
  $api.post('/main', formData);
  if(email == 'test' && password == '123')
    return true;
  else
    return false;
}
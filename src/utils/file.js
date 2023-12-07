import { getBase64 } from './base64.js';

export const convertFileToBase64OnChange = async (e) =>  {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;

  const base64Files = [];
  
  for (let i = 0; i < files.length; i++) {
    try {
      const res = await getBase64(files[i]);
      base64Files.push(res);
    } catch (error) {
      console.log(error);
    }
  }
  
  return base64Files;
}
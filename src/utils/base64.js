export const getBase64 = (inputFile) => {
  const temporaryFileReader = new FileReader();
  temporaryFileReader.readAsDataURL(inputFile);

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
  });
}
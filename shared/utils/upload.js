export const base64ToBinary = (dataURI, hasTypeOption = true) => {
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  }
  else {
    byteString = decodeURI(dataURI.split(',')[1]);
  }
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const options = hasTypeOption ? { type: mimeString } : undefined;
  return new Blob([ia], options);
};

export const getHeaderFromBase64 = data =>  {
  const head = data.split(";");
  const type = head[0].split(":");
  return { "Content-Type": type[1] };
};

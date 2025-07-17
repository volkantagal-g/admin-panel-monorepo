import { UploadFile } from 'antd/lib/upload/interface';

export const onPreview = async (file: UploadFile) => {
  let src = file.url;
  if (!src) {
    src = await new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as Blob);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  else {
    window.open(src);
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

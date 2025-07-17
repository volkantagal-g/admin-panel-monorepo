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

  const videoWindow = window.open('', '_blank', 'width=800,height=600');
  if (videoWindow) {
    videoWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: #000;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            video {
              max-width: 100%;
              max-height: 100%;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }
          </style>
        </head>
        <body>
          <video controls autoplay>
            <source src="${src}" type="video/mp4">
            <source src="${src}" type="video/webm">
            <source src="${src}" type="video/ogg">
          </video>
        </body>
      </html>
    `);
    videoWindow.document.close();
  }
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

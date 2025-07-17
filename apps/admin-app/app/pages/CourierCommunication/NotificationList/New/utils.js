export const ContentInformationParams = data => {
  const notificationContentData = {
    imagesBase64: {},
    title: {},
    message: {},
  };
  if (data?.image?.language) {
    notificationContentData.imagesBase64.all = data?.image.all;
  }
  else {
    const { all, language, ...rest } = data.image;
    notificationContentData.imagesBase64 = rest;
  }
  notificationContentData.title = data?.title;
  notificationContentData.message = data?.message;

  return notificationContentData;
};

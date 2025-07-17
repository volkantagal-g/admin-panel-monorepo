import axios from '@shared/axios/common';

export const getResults = body => {
  return axios({
    method: 'POST',
    url: '/notification/search',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getChainRestaurants = ({ skip, limit }) => {
  return axios({
    method: 'POST',
    url: '/food/getChainRestaurants',
    data: { skip, limit },
  }).then(response => {
    return response.data;
  });
};

export const getGlobalRuleset = () => {
  return axios({
    method: 'GET',
    url: '/notification/getGlobalSettings',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const createGlobalRuleset = body => {
  return axios({
    method: 'POST',
    url: '/notification/createGlobalSettings',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getChainRestaurantDetail = ({ id: chainRestaurantId }) => {
  return axios({
    method: 'POST',
    url: '/food/getChainBranchesById',
    data: { chainRestaurantId },
  }).then(response => {
    return response.data;
  });
};

export const getFoodPromoById = ({ promoId }) => {
  return axios({
    method: 'POST',
    url: '/promo/getFoodPromoById/',
    data: { promoId },
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantDetailsByIds = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/food/getRestaurantAllByIds',
    data: { body },
  }).then(response => {
    return response.data;
  });
};

export const getNotification = ({ id: notificationId }) => {
  return axios({
    method: 'GET',
    url: `/notification/get/${notificationId}`,
  }).then(response => {
    return response.data;
  });
};

export const getTotalUserCount = ({ id: notificationId }) => {
  return axios({
    method: 'GET',
    url: `/notification/getTotalUserCount/${notificationId}`,
  }).then(response => {
    return response.data;
  });
};

export const getSampleUserList = ({ notificationId }) => {
  return axios({
    method: 'get',
    url: `/notification/getSampleUserList/${notificationId}`,
  }).then(response => {
    return response.data;
  });
};

export const getChainBranchesById = ({ id: chainRestaurantId }) => {
  return axios({
    method: 'POST',
    url: '/food/getChainBranchesById',
    data: { chainRestaurantId },
  }).then(response => {
    return response.data;
  });
};

export const pauseNotification = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/notification/pause/${id}`,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

// TODO: Replace with promo/getPromos before end of july currently it's depends outdated be service
export const getPromoData = data => {
  return axios({
    method: 'GET',
    url: '/promo/getPromoData',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getFoodPromosBySearchCode = ({ params }) => {
  return axios({
    method: 'GET',
    url: '/promo/getFoodPromosBySearchCode/',
    params,
  }).then(response => {
    return response.data;
  });
};

export const resumeNotification = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/notification/resume/${id}`,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const cancelNotification = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/notification/cancel/${id}`,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const duplicateNotification = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/notification/duplicate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const deleteNotification = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/notification/delete/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const pauseAllByCountry = () => {
  return axios({
    method: 'POST',
    url: '/notification/pauseAllByCountry',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const resumeAllByCountry = () => {
  return axios({
    method: 'POST',
    url: '/notification/resumeAllByCountry',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncements = () => {
  // /notification/getAnnouncements is deprecated since it still depends on getir-admin which is deprecated
  // use @shared/api/promo -> getAnnouncementsByText
  return Promise.resolve({ data: [] }); // old response format
  // return axios({
  //   method: 'POST',
  //   url: '/notification/getAnnouncements',
  // }).then(response => {
  //   return response.data;
  // });
};

export const getStatistics = ({ notificationId }) => {
  return axios({
    method: 'GET',
    url: `/notification/getStatistics/${notificationId}`,
  }).then(response => {
    return response.data;
  });
};

export const notificationUpdate = ({ id, body }) => {
  return axios({
    method: 'PATCH',
    url: `/notification/update/${id}`,
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const notificationSave = body => {
  return axios({
    method: 'POST',
    url: '/notification/create',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getS3UploadUrl = async ({ csvName }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/notification/getS3UploadUrl/${csvName}`,
  }).then(response => {
    return response.data;
  });
  return data;
};

export const getRestaurantSearch = (searchString, cityIds) => {
  return axios({
    method: 'POST',
    url: `/food/getRestaurantSearch/search?name=${searchString}&cityIds=${cityIds}`,
  }).then(response => {
    return response.data;
  });
};

export const getS3ImageUploadUrl = ({ fileName }) => {
  return axios({
    method: 'GET',
    url: `/notification/getS3ImageUploadUrl/${fileName}`,
  }).then(response => {
    return response.data;
  });
};

export const sendTestPushNotification = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/notification/sendTestPushNotification',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const downloadSuccessListNotification = body => {
  return axios({
    method: 'POST',
    url: '/notification/downloadSuccessNotificationList',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const deleteNotifEvents = ({ notificationId }) => {
  return axios({
    method: 'POST',
    url: `/notification/deleteNotifEvent/${notificationId}`,
  }).then(response => {
    return response.data;
  });
};

export const getNotificationTags = ({ userLangKey }) => {
  return axios({
    method: 'POST',
    url: '/notification/getNotificationCategories',
    data: { userLangKey },
  }).then(response => {
    return response.data;
  });
};

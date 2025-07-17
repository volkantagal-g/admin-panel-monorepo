import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const getCouriersByName = ({ courierName }) => {
  return axios({
    method: 'POST',
    url: '/courier/findCouriersByName',
    data: { name: courierName },
  }).then(response => {
    return response.data;
  });
};

export const getInitialCouriersForLiveMap = data => {
  return axios({
    method: 'POST',
    url: '/courier/getInitialCouriersForLiveMap',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getCouriers = ({ city, country, domainTypes, isLoggedIn, fields }) => {
  return axios({
    method: 'POST',
    url: '/courier/getCouriers',
    data: {
      city,
      country,
      domainTypes,
      isLoggedIn,
      fields,
    },
  }).then(response => {
    return response.data;
  });
};

export const getCourier = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/courier/getCourierDetails',
    data: { _id: id },
  }).then(response => {
    return response.data;
  });
};

export const releaseCourier = ({ courierId, warehouseId }) => axios({
  method: 'POST',
  url: '/courier/releaseCourier',
  data: { courierId, warehouseId },
}).then(response => response.data);

export const getCourierBusyOptions = () => {
  return axios({
    method: 'POST',
    url: '/courier/getBusyOptions',
  }).then(response => {
    return response.data;
  });
};

export const setCourierFree = ({ id }) => {
  return axios({
    method: 'PUT',
    url: `/courier/free/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const setCourierBusy = ({ id, reason }) => {
  return axios({
    method: 'PUT',
    url: `/courier/busy/${id}`,
    data: { reason },
  }).then(response => {
    return response.data;
  });
};

export const setCourierActive = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/courier/activate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const setCourierDeactive = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/courier/deactivate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const restartCourierMDU = ({ id }) => {
  return axios({
    method: 'POST',
    url: `/courier/restartCourierMDU/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const sendNotification = ({ id, isSendDeviceInfo, isCheckServices, isStartServices, title, message }) => {
  return axios({
    method: 'POST',
    url: `/courier/sendNotification/${id}`,
    data: { isSendDeviceInfo, isCheckServices, isStartServices, title, message },
  }).then(response => {
    return response.data;
  });
};

export const setWarehouseToCourier = ({
  courierId,
  warehouseId,
  warehouseFranchiseId,
  currentMarketEmployer,
  workStatus,
}) => axios({
  method: 'POST',
  url: '/courier/setWarehouseToCourier',
  data: { courierId, warehouseId, warehouseFranchiseId, currentMarketEmployer, workStatus },
}).then(response => response.data);

export const setDomainType = ({ courierId, domainTypes }) => axios({
  method: 'PUT',
  url: `/courier/setDomainType/${courierId}`,
  data: { domainTypes },
}).then(response => response.data);

export const setAvailableVehicleTypes = ({ courierId, availableVehicleTypes }) => axios({
  method: 'PUT',
  url: `/courier/setAvailableVehicleType/${courierId}`,
  data: { availableVehicleTypes },
});

export const setEmploymentType = ({ courierId, employmentType }) => axios({
  method: 'PUT',
  url: `/courier/setEmploymentType/${courierId}`,
  data: { employmentType },
});

export const setChiefCourier = ({ courierId, chiefRank }) => axios({
  method: 'PUT',
  url: `/courier/chiefCourier/${courierId}`,
  data: { chiefRank },
});

export const setIsLoginDisabled = ({ courierId, isLoginDisabled }) => axios({
  method: 'PUT',
  url: `/courier/setIsLoginDisabled/${courierId}`,
  data: { isLoginDisabled },
}).then(response => response.data);

export const getOrderList = ({ courierId, domainType, limit, offset }) => axios({
  method: 'GET',
  url: `/courier/marketOrder/${courierId}?domainType=${domainType}&limit=${limit}&offset=${offset}`,
}).then(response => response.data);

export const getReturnDetailsWithReturnIdList = ({ returnIds }) => {
  return axios({
    method: 'POST',
    url: '/localsReturn/getReturnDetailsWithReturnIdList',
    data: { returnIds },
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getCourierStatusLogs = async ({ cancelSource, courierId, startDate, endDate }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: `/courier/statusLogs/${courierId}?startDate=${startDate}&endDate=${endDate}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const forceLogoutApi = async ({ courierId }) => axios({
  method: 'POST',
  url: `/courier/forceLogout/${courierId}`,
}).then(response => response.data);

export const resetCourierPassword = async ({ courierId }) => axios({
  method: 'POST',
  url: `/courier/resetCourierPassword/${courierId}`,
}).then(response => response.data);

export const setGeofenceByCourierId = async ({ courierId, isGeoFenceDisabled }) => axios({
  method: 'POST',
  url: '/courier/setGeoFenceByCourierId',
  data: { courierId, isGeoFenceDisabled },
}).then(response => response.data);

export const getCourierTasksByCourierId = ({ courierId }) => axios({
  method: 'GET',
  url: `/courier/getCourierTasksByCourierId?courierId=${courierId}`,
}).then(response => response.data);

export const getFeedbackOptions = ({ feedbackType }) => axios({
  method: 'POST',
  url: '/courier/feedback/getFeedbackOptions',
  data: { feedbackType },
}).then(response => {
  return response.data;
});

export const getFeedbackChartData = ({ filterOptions, language }) => axios({
  method: 'POST',
  url: '/courier/feedback/getChartData',
  data: { filterOptions, language },
}).then(res => res.data);

export const filterFeedbacks = ({ filterOptions, language, limit, pageNumber }) => axios({
  method: 'POST',
  url: '/courier/feedback/filter',
  data: { filterOptions, language, limit, pageNumber },
}).then(res => res.data);

export const filterCourierStatusAndBusy = async ({ domainTypes, statuses, warehouseIds, lastBusyOption, fields, withTotalCount, limit, offset }) => {
  const response = await axios({
    method: 'POST',
    url: '/courierHandler/couriers/filterCourierStatusAndBusy',
    data: { domainTypes, statuses, warehouseIds, lastBusyOption, fields, withTotalCount, limit, offset },
  });
  return response.data;
};

export const getGeoFenceLogs = async ({ cancelSource, courierId, startDate, endDate }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: `/courier/getCourierGeoFenceStatus/${courierId}?startDate=${startDate}&endDate=${endDate}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getCourierMduDiagnosticLogs = ({ courierId }) => axios({
  method: 'POST',
  url: `/courier/sendDeviceLogsNotification/${courierId}`,
}).then(res => res.data);

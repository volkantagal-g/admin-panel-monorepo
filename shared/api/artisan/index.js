import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';
import { GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';

export const getArtisanOrderDetail = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanOrderDetail',
    headers: { 'Accept-Language': getLangKey() },
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getCourierRoutes = ({ body }) => {
  const { orders, courierId } = body;
  return axios({
    method: 'POST',
    url: '/artisan/getCourierRoutes',
    data: { orders, courierId },
  }).then(response => {
    return response.data;
  });
};

export const getCourierReturnRoutes = ({ body }) => {
  const { returnOrders, courierId } = body;
  return axios({
    method: 'POST',
    url: '/artisan/getReturnCourierRoutes',
    data: { returnOrders, courierId },
  }).then(response => {
    return response.data;
  });
};

export const getArtisanOrderCancelOption = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanOrderCancelOptions',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getArtisanOrderCancel = ({ id, body: data }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanOrderCancel',
    data: { id, data },
  }).then(response => {
    return response.data;
  });
};

export const getArtisanOrderPayback = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanOrderPayback',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getArtisanRefundOption = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanRefundOptions',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getArtisanRefund = ({ orderDetailId, body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanRefund',
    data: { orderDetailId, updateData },
  }).then(response => {
    return response.data;
  });
};

export const getOrderReturns = ({ returnId }) => {
  return axios({
    method: 'GET',
    url: `/localsReturn/getReturnDetail/${returnId}`,
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getReturnsAvailability = ({ orderDetailId }) => {
  return axios({
    method: 'GET',
    url: `/localsReturn/getReturnAvailability/${orderDetailId}`,
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const cancelReturn = ({ returnId }) => {
  return axios({
    method: 'POST',
    url: `/localsReturn/cancelReturnRequest/${returnId}`,
  }).then(response => {
    return response.data;
  });
};

export const getArtisanNote = ({ filter }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanNote',
    data: { filter },
  }).then(response => {
    return response.data;
  });
};

export const createArtisanNote = ({ body: updateData, filter }) => {
  return axios({
    method: 'POST',
    url: '/artisan/createArtisanNote',
    data: { updateData, filter },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseById = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/getWarehouse',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createForbiddenMatch = ({ body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/artisan/createForbiddenMatch',
    data: { updateData },
  }).then(response => {
    return response.data;
  });
};

export const getArtisanTypes = () => {
  return axios({
    method: 'POST',
    url: '/artisan/getArtisanTypes',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const getArtisanCuisineTypes = () => {
  return axios({
    method: 'GET',
    url: '/artisanShop/getArtisanCuisineTypes',
  }).then(response => {
    return response.data;
  });
};

export const getLocalsChains = () => {
  return axios({
    method: 'GET',
    url: '/artisan/getLocalsMerchantsAll',
  }).then(response => {
    return response.data;
  });
};

export const getLocalsShopsByName = ({ name }) => {
  return axios({
    method: 'GET',
    url: `/artisan/getLocalsShopsByName?name=${name}`,
    data: { name },
  }).then(response => {
    return response.data;
  });
};

export const getCourierTasks = ({ orderDetailId, returnId }) => {
  return axios({
    method: 'GET',
    url: '/artisan/getCourierTasks',
    params: {
      orderDetailId,
      ...(returnId ? { returnId } : ''),
    },
  }).then(response => {
    return response.data;
  });
};

export const getCourierById = ({ courierId }) => {
  return axios({
    method: 'GET',
    url: `artisan/getReturnCourierById?courierId=${courierId}`,
  }).then(response => {
    return response.data;
  });
};

export const getArtisanCourierById = ({ courierId }) => {
  return axios({
    method: 'GET',
    url: `artisan/getArtisanCourierById?courierId=${courierId}`,
  }).then(response => {
    return response.data;
  });
};

export const getReturnReq = ({ orderId }) => axios({
  method: 'POST',
  url: '/localsReturn/createReturnRequest',
  headers: { 'Accept-Language': getLangKey() },
  data: { orderId },
}).then(response => response.data);

export const setReturnDeliveryReq = ({ returnId, ...data }) => axios({
  method: 'POST',
  url: `/localsReturn/setReturnDeliveryType/${returnId}`,
  headers: { 'Accept-Language': getLangKey() },
  data,
}).then(response => response.data);

export const createReturnReq = ({ returnId, ...data }) => axios({
  method: 'POST',
  url: `/localsReturn/returnSendRequest/${returnId}`,
  headers: { 'Accept-Language': getLangKey() },
  data,
}).then(response => response.data);

export const getReturnDetailsReq = ({ returnId }) => axios({
  method: 'GET',
  url: `/localsReturn/getReturnDetail/${returnId}`,
  headers: { 'Accept-Language': getLangKey() },
}).then(response => response.data);

export const changeReturnSlotReq = ({ returnId, ...data }) => axios({
  method: 'POST',
  url: `/localsReturn/changeSlotForReturn/${returnId}`,
  headers: { 'Accept-Language': getLangKey() },
  data,
}).then(response => response.data);

export const getShopReturnDetailsReq = ({ returnId }) => axios({
  method: 'GET',
  url: `/localsReturn/getShopReturnDetail/${returnId}`,
  headers: { 'Accept-Language': getLangKey() },
}).then(response => response.data);

export const getAvailableSlotsForReturnReq = ({ returnId }) => axios({
  method: 'GET',
  url: `/localsReturn/${returnId}/availableSlots`,
  headers: { 'Accept-Language': getLangKey() },
}).then(response => response.data);

export const getCurrentRunnerReq = ({ orderId }) => axios({
  method: 'GET',
  url: `/getirLocals/runner/currentRunner/${orderId}`,
}).then(response => response.data);

export const getReturnRunnerReq = ({ returnId }) => axios({
  method: 'GET',
  url: `/getirLocals/runner/return/${returnId}`,
}).then(response => response.data);

export const getReturnRunnerHistoryReq = ({ returnId }) => axios({
  method: 'GET',
  url: `/getirLocals/runner/return-history/${returnId}`,
}).then(response => response.data);

export const getCallInfoReq = ({ orderId, callPin }) => axios({
  method: 'GET',
  url: `/callManagement/getCallDetail?${new URLSearchParams({
    orderId,
    pin: callPin,
    domainType: GETIR_LOCALS_DOMAIN_TYPE,
  })}`,
}).then(response => response.data);

export const getConfigKey = ({ key, type }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: { key, type },
  }).then(response => {
    return response.data;
  });
};

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

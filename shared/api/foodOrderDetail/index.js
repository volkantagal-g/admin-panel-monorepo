import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';
import { getLangKey } from '@shared/i18n';

export const getFoodOrderDetail = ({ foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getFoodOrderDetail',
    data: { foodOrderId },
  }).then(response => {
    return response.data;
  });
};

export const getFoodOrderCancelOptions = ({ foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getFoodOrderCancelOptions',
    data: { foodOrderId },
  }).then(response => {
    return response.data;
  });
};

export const foodOrderCancel = ({ body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/foodOrderCancel',
    data: { updateData },
  }).then(response => {
    return response.data;
  });
};

export const getFoodOrderChangeOptions = () => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getFoodOrderChangeOptions',
    data: { langKey: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getAvailableChangeTypesForOrder = ({ foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getAvailableChangeTypesForOrder',
    data: { foodOrderId },
  }).then(response => {
    return response.data;
  });
};

export const addChangeReasonAtOrder = ({ body: updateData, foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/addChangeReasonAtOrder',
    data: { updateData, foodOrderId },
  }).then(response => {
    return response.data;
  });
};

export const addPromoIdToOrder = ({ foodOrderId, personalPromoId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/personalPromoId',
    data: { foodOrderId, personalPromoId },
  }).then(response => response.data);
};

export const updateChangeReasonAtOrder = ({ body: updateData, foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/updateChangeReasonAtOrder',
    data: { updateData, foodOrderId },
  }).then(response => {
    return response.data;
  });
};

export const getMainReasons = () => axios({
  method: 'POST',
  url: '/foodOrder/getMainReasons',
}).then(response => {
  return response.data;
});

export const getSubReasons = ({ id }) => axios({
  method: 'POST',
  url: '/foodOrder/getSubReasons',
  data: { id },
}).then(response => {
  return response.data;
});

export const getSubReason = ({ id }) => axios({
  method: 'POST',
  url: '/foodOrder/getSubReason',
  data: { id },
}).then(response => {
  return response.data;
});

export const getRefundSources = ({ foodOrderId }) => axios({
  method: 'POST',
  url: '/foodOrder/getRefundSources',
  data: { foodOrderId },
}).then(response => {
  return response.data;
});

export const getClientTrustScore = ({ body }) => axios({
  method: 'POST',
  url: '/foodOrder/getClientTrustScore',
  data: body,
}).then(response => response.data);

export const setInquiry = ({ body }) => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/foodOrder/setInquiry',
    data: { ...body, createdBy: userId },
  }).then(response => {
    return response.data;
  });
};

export const createForbiddenMatch = ({ client, description, person }) => {
  return axios({
    method: 'POST',
    url: '/food/createForbiddenMatch',
    data: { client, description, person },
  }).then(response => {
    return response.data;
  });
};

export const getFoodOrderCourierJson = ({ foodBasketIds }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getCourierJsonByBasketIds',
    data: { foodBasketIds },
  }).then(response => {
    return response.data;
  });
};

export const getFoodOrderFinancials = ({ foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getFoodOrderFinancials',
    data: { foodOrderId },
  }).then(response => {
    return response.data;
  });
};

export const getAgreementData = ({ foodOrderId, clientId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getAgreementData',
    data: { foodOrderId, clientId, langKey: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getCourierRoutes = ({ foodOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/getCourierRoutes',
    data: { foodOrderId },
  }).then(response => {
    return response.data;
  });
};

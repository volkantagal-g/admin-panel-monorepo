import axios from '@shared/axios/common';
import axiosClientDetail from '@shared/axios/clientDetail';

export const getClientDetailAccessToken = async ({ clientId }) => {
  const response = await axios({
    method: 'POST',
    url: '/clientDetail/getClientDetailAccessToken',
    data: { clientId },
  });

  return response.data;
};

export const getClient = async ({ id, integrationKey }) => {
  const data = { clientId: id };
  if (integrationKey) data.integrationKey = integrationKey.toUpperCase();
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientByClientId',
    data,
  });
  return response.data;
};

export const getSegmentsOfClient = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getSegmentsOfClient',
    data: { clientId },
  });
  return response.data;
};

export const getOrdersByFilters = body => {
  return axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/marketOrder/getByFilters',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getFoodOrdersByFilters = body => {
  return axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/foodOrder/getByFilters',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getTrips = body => {
  return axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getirBiTaksi/getTrips',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getClientInvoices = async data => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientInvoices',
    data,
  });
  return response.data;
};

export const getClientDiscounts = async data => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientDiscounts',
    data,
  });
  return response.data;
};

export const getClientFeedbacks = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientFeedbacks',
    data: { clientId },
  });

  return response.data;
};

export const getClientDevices = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientDevicesByClientId',
    data: { clientId },
  });

  return response.data;
};

export const createClientFeedback = async ({ data }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/createClientFeedback',
    data,
  });

  return response.data;
};

export const blockClientDevice = async ({ deviceId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/blockClientDevice',
    data: { deviceId },
  });

  return response.data;
};

export const unblockClientDevice = async ({ deviceId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/unblockClientDevice',
    data: { deviceId },
  });

  return response.data;
};

export const logoutClientDevice = async ({ clientId, deviceId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/logoutClientDevice',
    data: { clientId, deviceId },
  });

  return response.data;
};

export const logoutFromAllClientDevices = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/logoutFromAllClientDevices',
    data: { clientId },
  });

  return response.data;
};

export const getClientForbiddenMatches = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/getClientForbiddenMatches',
    data: { clientId },
  });

  return response.data;
};

export const updateClientForbiddenMatch = async ({
  clientId,
  forbiddenMatchId,
  description,
  isActive,
  person,
}) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/updateClientForbiddenMatch',
    data: {
      clientId,
      forbiddenMatchId,
      description,
      isActive,
      person,
    },
  });

  return response.data;
};

export const resolveClientFeedback = async ({ feedbackId, resolveNote }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/resolveClientFeedback',
    data: {
      feedbackId,
      resolveNote,
    },
  });

  return response.data;
};

export const getClientEligiblePromos = async ({ data }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientEligiblePromos',
    data,
  });

  return response.data;
};

export const updateContactNumber = async ({ clientId, contactNumber }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/updateContactNumber',
    data: {
      clientId,
      contactNumber,
    },
  });

  return response.data;
};

export const getClientShownPromos = async ({ data }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/getClientShownPromos',
    data,
  });

  return response.data;
};

export const getClientLoyaltyStamps = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'GET',
    url: `/clientDetail/getLoyaltyStamps?clientId=${clientId}`,
  });

  return response.data;
};

export const getGetirTableOrders = async ({ clientId, pageSize, pageIndex }) => {
  const response = await axiosClientDetail({
    method: 'GET',
    url: '/clientDetail/getGetirTableOrders',
    params: { clientId, pageSize, pageIndex },
  });

  return response.data;
};

export const updateClientActiveness = async ({ clientId, isActivated }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/updateClientActiveness',
    data: {
      clientId,
      isActivated,
    },
  });

  return response.data;
};

export const closeClientAccount = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/closeClientAccount',
    data: { clientId },
  });

  return response.data;
};

export const reopenClientAccount = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/reopenClientAccount',
    data: { clientId },
  });

  return response.data;
};

export const anonymiseClientAccount = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/anonymiseClientAccount',
    data: { clientId },
  });

  return response.data;
};

export const unlinkFacebook = async ({ clientId }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/unlinkFacebook',
    data: { clientId },
  });

  return response.data;
};

export const getGetirWaterMarketplaceOrders = async ({ clientId, count, page }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: 'clientDetail/getirWaterMarketplace/getOrders',
    data: { clientId, count, page },
  });

  return response.data;
};

export const getMarketingCommunicationPreferences = async ({ clientId }) => {
  const response = await axios({
    method: 'GET',
    url: `/clientDetail/communication-preferences?clientId=${clientId}`,
  });
  return response.data;
};

export const updateMarketingCommunicationPreferences = async ({ data }) => {
  const response = await axiosClientDetail({
    method: 'POST',
    url: '/clientDetail/update-communication-preferences',
    data,
  });
  return response.data;
};

export const getSubscriptionDetails = async ({ id, typeCode, countryCode }) => {
  const response = await axiosClientDetail({
    method: 'GET',
    url: `/clientDetail/subscription/details/${id}`,
    params: { typeCode, countryCode },
  });
  return response.data;
};

export const getTransactionDetails = async ({ cycleId }) => {
  const response = await axiosClientDetail({
    method: 'GET',
    url: `/clientDetail/subscription/transaction/history/${cycleId}`,
  });
  return response.data;
};

export const getFinanceOrders = async ({ clientId, size, page }) => {
  const response = await axiosClientDetail({
    method: 'GET',
    url: `/clientDetail/financeOrderByClientId/${clientId}`,
    params: { size, page },
  });
  return response.data;
};

export const getGetirJobsClientStatus = async clientId => {
  const response = await axios({
    method: 'GET',
    url: `/clientDetail/getirJobs/status/${clientId}`,
  });
  return response.data;
};

export const deleteGetirJobsClient = async clientId => {
  const response = await axios({
    method: 'DELETE',
    url: `/clientDetail/getirJobs/${clientId}`,
  });
  return response.data;
};

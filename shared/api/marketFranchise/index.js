import axios from '@shared/axios/common';

export const getMarketFranchises = ({
  name,
  cities,
  domainTypes,
  franchiseTypes,
  isActivated,
  limit,
  offset,
  populate = ['warehouse', 'owner'],
  fields,
}) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/getMarketFranchises',
    data: { name, cities, domainTypes, franchiseTypes, isActivated, limit, offset, populate, fields },
  }).then(response => {
    return response.data;
  });
};

export const createMarketFranchise = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/createMarketFranchise',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getMarketFranchiseById = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/getMarketFranchise',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const updateMarketFranchise = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/updateMarketFranchise',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const updateMarketFranchiseWithSAP = ({ referenceCode, updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/updateMarketFranchiseBySAPReferenceCode',
    data: { referenceCode, updateData },
  }).then(response => {
    return response.data;
  });
};

export const updateCommissionRates = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketFranchise/updateFranchiseCommissions',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const getMarketFranchiseCrisisTopics = () => {
  return axios({
    method: 'POST',
    url: '/franchiseCrisisManagement/getAllTopics',
  }).then(response => {
    return response.data;
  });
};

export const createNewCrisisCard = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/franchiseCrisisManagement/createCard',
    data: { ...data },
  }).then(response => {
    return response.data;
  });
};

export const getNewCardUploadSignedUrl = async ({ contentType, key }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseCrisisManagement/uploadFile',
    data: { contentType, key },
  });
  return data;
};

export const updateCrisisCard = ({ files, notes, _id, topicId }) => {
  return axios({
    method: 'POST',
    url: '/franchiseCrisisManagement/updateCard',
    data: { files, notes, _id, topicId },
  }).then(response => {
    return response.data;
  });
};

export const getCrisisCardList = ({
  franchiseId,
  topicId,
  limit,
  offset,
}) => {
  return axios({
    method: 'POST',
    url: '/franchiseCrisisManagement/getCards',
    data: { franchiseId, topicId, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const exportCrisisCardList = ({
  franchiseId,
  topicId,
  utcOffset,
  lang,
}) => {
  return axios({
    method: 'POST',
    url: '/franchiseCrisisManagement/exportCards',
    data: { franchiseId, topicId, utcOffset, lang },
  }).then(response => {
    return response.data;
  });
};

export const getCrisisLogsListRequest = ({ limit, offset, franchiseId, cardNumber }) => {
  return axios({
    method: 'POST',
    url: 'franchiseCrisisManagement/getLogs',
    data: { limit, offset, franchiseId, cardNumber },
  }).then(response => {
    return response.data;
  });
};

export const exportCrisisLogsList = ({
  franchiseId,
  cardNumber,
  utcOffset,
  lang,
}) => {
  return axios({
    method: 'POST',
    url: 'franchiseCrisisManagement/exportLogs',
    data: { franchiseId, utcOffset, lang, cardNumber },
  }).then(response => {
    return response.data;
  });
};

export const getCrisisCardById = ({ cardId }) => {
  return axios({
    method: 'POST',
    url: 'franchiseCrisisManagement/getCardDetail',
    data: { cardId },
  }).then(response => {
    return response.data;
  });
};

export const removeCrisisCardById = ({ cardId }) => {
  return axios({
    method: 'POST',
    url: 'franchiseCrisisManagement/deleteCard',
    data: { cardId },
  }).then(response => {
    return response.data;
  });
};

export const getFranchiseAreas = async ({ franchiseId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFranchise/getAreasByFranchiseId',
    data: { franchiseId },
  });
  return data;
};

export const createFranchiseArea = async ({ areaName, franchiseId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFranchise/area',
    data: { areaName, franchiseId },
  });
  return data;
};

export const getFranchisesAreas = async ({ franchiseIds }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFranchise/getAreasByFranchiseIds',
    data: { franchiseIds },
  });
  return data;
};

export const updateFranchiseArea = async ({ franchiseAreaId, areaName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFranchise/updateAreaName',
    data: { franchiseAreaId, areaName },
  });
  return data;
};

export const deleteFranchiseArea = async ({ franchiseAreaId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFranchise/deleteArea',
    data: { franchiseAreaId },
  });
  return data;
};

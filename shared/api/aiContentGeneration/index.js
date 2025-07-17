import axios from '@shared/axios/common';

export const getP3SegmentGenerationDetails = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/getP3Status',
    data: { id },
  });
  return data;
};

export const generateP3Segment = async body => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/generateP3Segment',
    data: body,
  });
  return data;
};

/**
 * @param {id: MongoIDType} args
 * @returns {Promise<AICommunicationsDetails>}
 */
export const getCommsStatus = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/getCommsStatus',
    data: { id },
  });
  return data;
};

/**
 * @param {GenerateAICommunicationsAPIRequest} args
 * @returns {Promise<any>}
 */
export const generateComms = async ({
  id,
  promoCode,
  description,
  assets,
  domains,
  countryId,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/generateComms',
    data: {
      id,
      promoCode,
      description,
      assets,
      domains,
      countryId,
    },
  });
  return data;
};

export const getP3SegmentCounts = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/getP3SegmentCounts',
    data: { id },
  });
  return data;
};

export const downloadP3SegmentClients = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/downloadP3SegmentClients',
    data: { id },
  });
  return data;
};

export const deleteP3 = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/deleteP3',
    data: { id },
  });
  return data;
};

export const getContentCreationTransactionId = async body => {
  const { data } = await axios.post('aiContentGeneration/getTransactionId', body);
  return data;
};

export const getContentCreationTransactionDetails = async body => {
  const { data } = await axios.post('aiContentGeneration/getTransactionDetailsByTransactionId', body);
  return data;
};

export const getFilteredGeneratedContent = async body => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/getFilteredGeneratedContent',
    data: body,
  });
  return data;
};

export const getGeneratedContentForPromoId = async body => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/getGeneratedContentForPromoId',
    data: body,
  });
  return data;
};

export const updateNotifications = async body => {
  const { data } = await axios({
    method: 'POST',
    url: 'aiContentGeneration/updateNotifications',
    data: body,
  });
  return data;
};

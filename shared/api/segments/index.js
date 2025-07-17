import axios from '@shared/axios/common';

export const getSegment = async ({ segment }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/getSegment',
    data: { segment },
  });

  return data;
};
export const getSegmentClientCount = async ({ segment }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/getSegmentClientCount',
    data: { segment },
  });

  return data;
};

export const getSegments = async ({ limit, offset, search }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/filterSegments',
    data: {
      limit,
      offset,
      search,
    },
  });

  return data;
};

export const deleteSegment = async ({ segmentNumber }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/deleteSegment',
    data: { segmentNumber },
  });

  return data;
};

export const resetClientsOfSegment = async ({ segmentNumber }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/resetClients',
    data: { segmentNumber },
  });

  return data;
};

export const createSegment = async segment => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/createSegment',
    data: { segment },
  });

  return data;
};

export const updateSegment = async ({ segmentNumber, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/updateSegment',
    data: { segmentNumber, updateData },
  });

  return data;
};

export const removeSegmentFromClients = async ({ segment, clientIds }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/removeSegmentFromClients',
    data: { segment, clientIds },
  });

  return data;
};

export const getSignedUploadUrl = async ({
  fileName,
  contentType,
  folderPath,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/getSignedUploadUrl',
    data: {
      fileName,
      contentType,
      folderPath,
    },
  });

  return data;
};

export const triggerClientAddSegment = async ({ awsPath, segment }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/triggerClientAddSegment',
    data: { awsPath, segment },
  });

  return data;
};

export const updateExpirationStatus = async ({ segmentNumber, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/updateExpirationStatus',
    data: { segmentNumber, updateData },
  });

  return data;
};

export const updateIndefiniteExpiration = async ({ segmentNumber, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/updateIndefiniteExpiration',
    data: { segmentNumber, updateData },
  });

  return data;
};

export const sendStats = async ({ segmentNumbers, email }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/sendStats',
    data: { segmentNumbers, email },
  });

  return data;
};

export const addClientIdsToSegment = async ({ email, clientIds, segmentId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/batch/clients/add-segment',
    data: { clientIds, segmentId, email },
  });

  return data;
};

export const removeClientIdsFromSegment = async ({ email, clientIds, segmentId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/batch/clients/delete-segment',
    data: { clientIds, segment: segmentId, email },
  });

  return data;
};

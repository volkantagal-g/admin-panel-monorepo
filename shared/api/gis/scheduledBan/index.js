import axios from '@shared/axios/common';

export const getAllScheduledBans = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/scheduledBan/getAllScheduledBans',
    data: requestBody,
  });
  return response.data;
};

export const deleteScheduledBannedArea = async ({ scheduledBannedAreaId }) => {
  const response = await axios({
    method: 'DELETE',
    url: `/gis/scheduledBan/deleteScheduledBannedArea/${scheduledBannedAreaId}`,
    data: { scheduledBannedAreaId },
  });
  return response.data;
};

export const createScheduledBannedArea = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/scheduledBan/createScheduledBannedArea',
    data: requestBody,
  });
  return response.data;
};

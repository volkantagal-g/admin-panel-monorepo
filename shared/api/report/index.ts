import axios from '@shared/axios/common';

export const REPORT_BASE_URL = '/report';

export const getReportTags = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getReportTags`,
    data,
  });
  return response.data;
};

export const getReportTagsByRoles = async (data: { roleIds: MongoIDType[] }): Promise<ReportType> => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getReportTagsByRoles`,
    data,
  });
  return response.data;
};

export const getReportTagById = async id => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getReportTagById`,
    data: { _id: id },
  });
  return response.data;
};

export const createReportTag = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/createReportTag`,
    data,
  });
  return response.data;
};

export const updateReportTag = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/updateReportTag`,
    data,
  });
  return response.data;
};

export const deleteReportTag = async id => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/deleteReportTag`,
    data: { _id: id },
  });
  return response.data;
};

export const addRolesToReportTag = async ({ roleIds, reportTagId }) => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/addRolesToReportTag`,
    data: { roleIds, reportTagId },
  });
  return response.data;
};

export const getRolesByReportTags = async ({ reportTagIds }) => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getRolesByReportTags`,
    data: { reportTagIds },
  });
  return response.data;
};

export const removeRoleFromReportTag = async ({ reportTagId, roleId }) => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/removeRoleFromReportTag`,
    data: { reportTagId, roleId },
  });
  return response.data;
};

export const getReportTypes = async ({
  limit,
  offset,
  filter,
  fields,
}: {
  limit: number,
  offset: number,
  filter: string,
  fields: any,
}): Promise<ReportType[]> => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getReportTypes`,
    data: { limit, offset, filter, fields },
  });
  return response.data;
};

export const createReportType = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/createReportType`,
    data,
  });
  return response.data;
};

export const getReportTypeById = async id => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getReportTypeById`,
    data: { _id: id },
  });
  return response.data;
};

export const updateReportType = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/updateReportType`,
    data,
  });
  return response.data;
};

export const getReportTypeReportTags = async id => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getReportTypeReportTags`,
    data: { _id: id },
  });
  return response.data;
};

export const addReportTagsToReportType = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/addReportTagsToReportType`,
    data,
  });
  return response.data;
};

export const removeReportTagsFromReportType = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/removeReportTagsFromReportType`,
    data,
  });
  return response.data;
};

export const deleteReportType = async id => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/deleteReportType`,
    data: { _id: id },
  });
  return response.data;
};

export const createReport = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/createReport`,
    data,
  });
  return response.data;
};

export const getMyReportTypes = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getMyReportTypes`,
    data,
  });
  return response.data;
};

export const getMyReportsBetweenDateRange = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getMyReportsBetweenDateRange`,
    data,
  });
  return response.data;
};

export const getUploadUrlForReportInputs = async data => {
  const response = await axios({
    method: 'POST',
    url: `${REPORT_BASE_URL}/getUploadUrlForReportInputs`,
    data,
  });
  return response.data;
};

import axios from '@shared/axios/common';

export const createStoreAudit = payload => {
  return axios({
    method: 'POST',
    url: '/franchiseAudit/form/create',
    data: { ...payload },
  }).then(response => {
    return response.data;
  });
};

export const getStoreAuditList = ({ requestBody, limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/franchiseAudit/auditForm/filter',
    data: { ...requestBody, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getStoreAuditDetail = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseAudit/auditForm/detail',
    data: { auditFormId: id },
  });
  return data;
};

export const updateStoreAuditDetail = async ({ data: body, isPowerUserRequest }) => {
  const url = isPowerUserRequest ? '/franchiseAudit/auditForm/updateByPowerUser' : '/franchiseAudit/auditForm/update';
  const { data } = await axios({
    method: 'POST',
    url,
    data: body,
  });
  return data;
};

export const getS3SignedUrl = async ({ contentType, key }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseAudit/uploadFile',
    data: { contentType, key },
  });
  return data;
};

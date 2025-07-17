import axios from '@shared/axios/common';

export const getFranchiseLegalAgreementSignedUrl = async ({ contentType, fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise/agreement/get-upload-signed-url',
    data: { contentType, fileName },
  });
  return data;
};

export const triggerFranchiseLegalAgreementParse = async ({ fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchise/agreement/after-upload',
    data: { fileName },
  });
  return data;
};

export const getFranchiseLegalAgreementList = ({ limit, offset }) => {
  return axios({
    method: 'GET',
    url: '/franchise/agreement/filter',
    params: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const changeFranchiseLegalAgreementStatus = async ({ agreementId, status }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchise/agreement/${agreementId}/status`,
    data: { status: !status },
  });
  return data;
};

export const getFranchiseLegalAgreementDetail = ({ agreementId }) => {
  return axios({
    method: 'GET',
    url: `/franchise/agreement/detail/${agreementId}`,
  }).then(response => {
    return response.data;
  });
};

export const getFranchiseLegalAgreementHistory = ({ agreementId }) => {
  return axios({
    method: 'GET',
    url: `/franchise/agreement/notification-history/${agreementId}`,
  }).then(response => {
    return response.data;
  });
};

export const notifyFranchises = ({ agreementId }) => {
  return axios({
    method: 'POST',
    url: `/franchise/agreement/acceptance-notification/${agreementId}`,
  }).then(response => {
    return response.data;
  });
};

export const getFranchiseLegalAgreementTableDetail = ({ limit, offset, agreementId, filters }) => {
  return axios({
    method: 'POST',
    url: `/franchise/agreement/acceptance-detail/${agreementId}`,
    params: { limit, offset },
    data: { ...filters },
  }).then(response => {
    return response.data;
  });
};

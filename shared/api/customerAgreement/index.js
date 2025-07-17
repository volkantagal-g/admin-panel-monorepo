import axios from '@shared/axios/common';

const CUSTOMER_AGREEMENT_PATH = 'customerAgreement';

export const getDocumentTypes = () => {
  return axios({
    method: 'POST',
    url: `/${CUSTOMER_AGREEMENT_PATH}/documentTypes`,
  }).then(response => {
    return response.data;
  });
};

export const forceAgreement = ({ agreementId }) => {
  return axios({
    method: 'POST',
    url: `/${CUSTOMER_AGREEMENT_PATH}/force`,
    data: { agreementId },
  }).then(response => {
    return response.data;
  });
};

export const unforceAgreement = ({ agreementId }) => {
  return axios({
    method: 'POST',
    url: `/${CUSTOMER_AGREEMENT_PATH}/unforce`,
    data: { agreementId },
  }).then(response => {
    return response.data;
  });
};

export const getPreviousAgreements = ({ agreementType, page }) => {
  return axios({
    method: 'POST',
    url: `/${CUSTOMER_AGREEMENT_PATH}/previousVersions`,
    data: { agreementType, page },
  }).then(response => {
    return response.data;
  });
};

export const getSignedAgreementUploadUrl = ({ agreementType, agreementLanguage }) => {
  return axios({
    method: 'POST',
    url: `/${CUSTOMER_AGREEMENT_PATH}/signedUrl`,
    data: { agreementType, agreementLanguage },
  }).then(response => {
    return response.data;
  });
};

export const saveAgreement = ({ agreementType, files, nextVersion }) => {
  return axios({
    method: 'POST',
    url: `/${CUSTOMER_AGREEMENT_PATH}/save`,
    data: { agreementType, files, nextVersion },
  }).then(response => {
    return response.data;
  });
};

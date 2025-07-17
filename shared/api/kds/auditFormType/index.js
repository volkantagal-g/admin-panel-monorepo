import axios from '@shared/axios/common';

export const getAuditFormTypeRequest = ({ limit, offset }) => {
  return axios({
    method: 'POST',
    url: 'franchiseAudit/auditFormType/list',
    data: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getAuditFormTypeDetail = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseAudit/auditFormType/detail',
    data: { auditFormTypeId: id },
  });
  return data;
};

export const updateKdsAuditFormType = async ({ data: body }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseAudit/auditFormType/update',
    data: body,
  });
  return data;
};

export const createKdsAuditFormType = ({ name, isSendToFranchise }) => {
  return axios({
    method: 'POST',
    url: '/franchiseAudit/auditFormType/create',
    data: { name, isSendToFranchise },
  }).then(response => {
    return response.data;
  });
};

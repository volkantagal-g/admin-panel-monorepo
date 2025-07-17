import axios from '@shared/axios/common';

export const getKdsQuestionGroupList = async ({ limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseAudit/questionGroup/filter',
    data: { limit, offset },
  });
  return data;
};

export const createKdsQuestionGroup = ({ name, status, auditFormType }) => {
  return axios({
    method: 'POST',
    url: '/franchiseAudit/questionGroup/create',
    data: { name, status, auditFormType },
  }).then(response => {
    return response.data;
  });
};

export const getQuestionGroupDetail = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchiseAudit/questionGroup/detail`,
    data: { questionGroupId: id },
  });
  return data;
};

export const updateKdsQuestionGroup = async ({ data: body }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchiseAudit/questionGroup/update`,
    data: body,
  });
  return data;
};

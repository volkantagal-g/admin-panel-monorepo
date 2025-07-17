import axios from '@shared/axios/common';

export const getKdsQuestionListRequest = ({ limit, offset }) => {
  return axios({
    method: 'POST',
    url: 'franchiseAudit/question/list',
    data: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const createKdsQuestionRequest = ({ question }) => {
  return axios({
    method: 'POST',
    url: 'franchiseAudit/question/create',
    data: question,
  }).then(response => {
    return response.data;
  });
};

export const updateKdsQuestion = ({ data }) => {
  return axios({
    method: 'POST',
    url: 'franchiseAudit/question/update',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getKdsQuestionDetail = ({ id }) => {
  return axios({
    method: 'POST',
    url: 'franchiseAudit/question/detail',
    data: { questionId: id },
  }).then(response => {
    return response.data;
  });
};

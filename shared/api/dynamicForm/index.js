import axios from '@shared/axios/common';

export const getForm = ({ formType, formName, countryCode }) => {
  return axios({
    method: 'GET',
    url: '/dynamicForm/form',
    params: { formType, formName, countryCode },
  }).then(response => response.data);
};

export const getDynamicFormColumns = ({ formName, formType }) => {
  return axios({
    method: 'GET',
    url: '/dynamicForm/columns',
    params: { formName, formType },
  }).then(response => {
    return response.data;
  });
};

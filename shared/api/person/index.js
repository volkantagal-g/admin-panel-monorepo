import axios from '@shared/axios/common';

export const filterInformationEditRequest = ({
  person,
  franchise,
  status,
  startDate,
  endDate,
  limit,
  offset,
}) => {
  return axios({
    method: 'POST',
    url: '/person/change-approvals/filter',
    data: { person, franchise, status, startDate, endDate, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getInformationEditRequestDetail = ({ approvalId }) => {
  return axios({
    method: 'GET',
    url: `/person/change-approvals/${approvalId}`,
  }).then(response => {
    return response.data;
  });
};

export const acceptInformationEditRequest = ({ approvalId, description }) => {
  return axios({
    method: 'POST',
    url: `/person/change-approvals/${approvalId}/accept`,
    data: { description },
  }).then(response => {
    return response.data;
  });
};

export const rejectInformationEditRequest = ({ approvalId, description }) => {
  return axios({
    method: 'POST',
    url: `/person/change-approvals/${approvalId}/ignore`,
    data: { description },
  }).then(response => {
    return response.data;
  });
};

export const filterPersonCandidateList = ({
  franchise,
  warehouse,
  status,
  workerType,
  startDate,
  endDate,
  assignees,
  uniqueIdentifier,
  limit,
  offset,
}) => {
  return axios({
    method: 'POST',
    url: '/person/person-candidate/filter',
    data: {
      franchise,
      warehouse,
      status,
      workerType,
      startDate,
      endDate,
      assignees,
      uniqueIdentifier,
      limit,
      offset,
    },
  }).then(response => response.data);
};

export const getPersonCandidateDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/person/person-candidate/${id}`,
  }).then(response => response.data);
};

export const updatePersonCandidate = ({
  id,
  data,
  formName,
  formType,
  countryCode,
}) => {
  return axios({
    method: 'PUT',
    url: `/person/person-candidate/${id}`,
    data: { data, formName, formType, countryCode },
  }).then(response => response.data);
};

export const getSignedFileUrl = async ({ url }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/person/attachment/url',
    data: { url },
  });
  return data;
};

export const getPeople = async ({ franchiseId, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/getPeople',
    data: { franchiseId, fields },
  });
  return data;
};

export const isBanned = async ({ uniqueIdentifier }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/person/isBanned/${uniqueIdentifier}`,
  });
  return data;
};

export const updateAssignee = async ({ candidateId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/person-candidate/assignee',
    data: { candidateId },
  });
  return data;
};

export const getCandidateActionHistory = async ({ candidateId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/candidate-action-history',
    data: { candidateId },
  });
  return data;
};

export const createPerson = async data => {
  const response = await axios({
    method: 'POST',
    url: '/person/create',
    data,
  });
  return response.data;
};

export const getPersonList = async ({ limit, offset, query, sort, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/filter',
    data: {
      limit,
      offset,
      query,
      sort,
      fields,
    },
  });
  return data;
};

export const getPersonListExcel = async ({ query, sort, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/excel',
    data: {
      query,
      sort,
      fields,
    },
  });
  return data;
};

export const getPersonDetail = async ({ personId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/getPersonById',
    data: { personId },
  });
  return data;
};

export const updatePersonDetail = async ({
  personId,
  updateData,
  onlyPerson,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/update',
    data: { personId, updateData, onlyPerson },
  });
  return data;
};

export const addPersonTraining = async ({ person, trainingObj }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/addTraining',
    data: { person, trainingObj },
  });
  return data;
};

export const disableLoginOfCouriers = async ({
  id,
  courierDisableReason,
  isLoginDisabled,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/disableLoginOfCouriers',
    data: { id, courierDisableReason, isLoginDisabled },
  });
  return data;
};

export const setMarketEmployer = async body => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/setMarketEmployer',
    data: body,
  });
  return data;
};

export const unsetMarketEmployer = async ({ person, franchise }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/unsetMarketEmployer',
    data: { person, franchise },
  });
  return data;
};

export const editMarketEmployer = async body => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/editMarketEmployers',
    data: body,
  });
  return data;
};

export const changePassword = async ({ id, password }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/changePassword',
    data: { id, password },
  });
  return data;
};

export const createCourierForPerson = async ({ id, courierTypes }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/createCourierForPerson',
    data: { id, courierTypes },
  });
  return data;
};

export const createPickerForPerson = async ({ id, pickerTypes }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/createPickerForPerson',
    data: { id, pickerTypes },
  });
  return data;
};

export const getAvatarSignedUrl = async ({ fileName, contentType }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/attachment/getAvatarSignedUrl',
    data: { fileName, contentType },
  });
  return data;
};

export const changeAvatar = async ({ id, fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/changeAvatar',
    data: { id, fileName },
  });
  return data;
};

export const activatePerson = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/activate',
    data: { id },
  });
  return data;
};

export const deactivatePerson = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/deactivate',
    data: { id },
  });
  return data;
};

export const removeEmployeeDiscount = async ({
  gsm,
  countryCode,
  segments,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/removeEmployeeDiscount',
    data: { gsm, countryCode, segments },
  });
  return data;
};

export const addEmployeeDiscount = async ({ gsm, countryCode, segments }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/addEmployeeDiscount',
    data: { gsm, countryCode, segments },
  });
  return data;
};

export const removeAndAddEmployeeDiscount = async ({
  oldPersonalGsm,
  oldCountryCode,
  personalGsm,
  countryGsmCode,
  segments,
  isActivated,
  shouldAddEmployeeDiscount,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/person/removeAndAddEmployeeDiscount',
    data: {
      oldPersonalGsm,
      oldCountryCode,
      personalGsm,
      countryGsmCode,
      segments,
      isActivated,
      shouldAddEmployeeDiscount,
    },
  });
  return data;
};

export const getPersonCandidateReport = async ({ filters, utcOffset, lang }) => {
  const { data } = await axios.post('/person/person-candidate/export', { filters, utcOffset, lang });
  return data;
};

export const getGetirUpTrainings = async ({ personId }) => {
  const { data } = await axios.post('/person/getTrainingUnits', { personId });
  return data;
};

import { getirUpTrainings, mockUpdatePersonDetailData, personDetail, personList } from './index.mock.data';

const getPersonDetailMock = {
  url: '/person/getPersonById',
  method: 'post',
  successData: personDetail,
};

const getTrainingUnitsMock = {
  url: '/person/getTrainingUnits',
  method: 'post',
  successData: getirUpTrainings,
};

const updatePersonDetailMock = {
  url: '/person/update',
  method: 'post',
  successData: mockUpdatePersonDetailData,
};

const removeAndAddEmployeeDiscountMock = {
  url: '/person/removeAndAddEmployeeDiscount',
  method: 'post',
  successData: [],
};

const addTrainingMock = {
  url: '/person/addTraining',
  method: 'post',
  successData: mockUpdatePersonDetailData,
};

const editMarketEmployerMock = {
  url: '/person/editMarketEmployers',
  method: 'post',
  successData: personDetail,
};

export const personListMock = {
  url: '/person/filter',
  method: 'post',
  successData: personList,
};

export default [getTrainingUnitsMock, updatePersonDetailMock, removeAndAddEmployeeDiscountMock, addTrainingMock, getPersonDetailMock, editMarketEmployerMock];

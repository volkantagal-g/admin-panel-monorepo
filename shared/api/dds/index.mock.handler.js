import * as MOCKS from './index.mock.data';

const getObjectionDetailById = '/dds/getObjection';
const rejectObjectionById = '/dds/rejectObjection';
const acceptObjectionById = '/dds/acceptObjection';
const getDdsCriteria = '/dds/dds100/criteria/filter';
const getDdsObjectionList = '/dds/objections/filter';

export const getObjectionDetailByIdMockOptions = {
  url: getObjectionDetailById,
  successData: MOCKS.mockedObjectionDetail,
};

export const rejectObjectionByIdMockOptions = {
  url: rejectObjectionById,
  successData: { id: '123123' },
};

export const acceptObjectionByIdMockOptions = {
  url: acceptObjectionById,
  successData: { id: '123123' },
};

export const getDdsCriteriaOptions = {
  url: getDdsCriteria,
  method: 'get',
  successData: MOCKS.mockedDdsCriteria,
};

export const getDdsObjectionListOptions = {
  url: getDdsObjectionList,
  successData: MOCKS.mockedDdsObjectionList,
};

export default [
  getObjectionDetailByIdMockOptions,
  rejectObjectionByIdMockOptions,
  acceptObjectionByIdMockOptions,
  getDdsCriteriaOptions,
  getDdsObjectionListOptions,
];

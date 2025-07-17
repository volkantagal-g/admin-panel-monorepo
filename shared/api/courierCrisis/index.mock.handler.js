import * as MOCKS from './index.mock.data';

const getCrisisIncidentMock = {
  url: '/courierCrisisManagement/getCards',
  successData: MOCKS.crisisIncidentList,
};

const getCrisisLogsMock = {
  url: '/courierCrisisManagement/getLogs',
  successData: MOCKS.crisisLogsList,
};

const getUploadUrlMock = {
  url: '/courierCrisisManagement/generateUploadUrl',
  successData: MOCKS.uploadedUrls,
};

const createCardMock = {
  url: '/courierCrisisManagement/createCard',
  successData: MOCKS.createCard,
};

const deleteAttachmentMock = {
  url: '/courierCrisisManagement/deleteAttachment',
  successData: {},
};

const exportIncidentsMock = {
  url: '/courierCrisisManagement/exportCards',
  successData: MOCKS.exportExcel,
};

const exportLogsMock = {
  url: '/courierCrisisManagement/exportLogs',
  successData: MOCKS.exportExcel,
};

export default [
  getCrisisIncidentMock,
  getCrisisLogsMock,
  getUploadUrlMock,
  createCardMock,
  deleteAttachmentMock,
  exportLogsMock,
  exportIncidentsMock,
];

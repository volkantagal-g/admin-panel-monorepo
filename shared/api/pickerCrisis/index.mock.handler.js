import * as MOCKS from './index.mock.data';

const getCrisisIncidentMock = {
  url: '/picker/crises/getCards',
  successData: MOCKS.crisisIncidentList,
};

const getCrisisLogsMock = {
  url: '/picker/crises/getLogs',
  successData: MOCKS.crisisLogsList,
};

const getUploadUrlMock = {
  url: '/picker/crises/generateUploadUrl',
  successData: MOCKS.uploadedUrls,
};

const createCardMock = {
  url: '/picker/crises/createCard',
  successData: MOCKS.createCard,
};

const deleteAttachmentMock = {
  url: '/picker/crises/deleteAttachment',
  successData: {},
};

const exportIncidentsMock = {
  url: '/picker/crises/exportCards',
  successData: MOCKS.exportExcel,
};

const exportLogsMock = {
  url: '/picker/crises/exportLogs',
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

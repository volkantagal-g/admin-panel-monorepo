import * as MOCKS from './index.mock.data';

const getFranchiseInformationURL = '/marketFranchise/getMarketFranchise';
const updateFranchiseInformationURL = '/marketFranchise/updateMarketFranchise';
const getCrisesManagementCardsURL = '/franchiseCrisisManagement/getCards';
const getCrisesManagementCardDetailURL = '/franchiseCrisisManagement/getCardDetail';
const updateCrisesManagementCardURL = '/franchiseCrisisManagement/updateCard';
const getAllTopicsURL = '/franchiseCrisisManagement/getAllTopics';
const getFranchiseAreasURL = '/marketFranchise/getAreasByFranchiseId';
const createFranchiseAreaURL = '/marketFranchise/area';
const updateFranchiseAreaURL = '/marketFranchise/updateAreaName';
const deleteFranchiseAreaURL = '/marketFranchise/deleteArea';

const getFranchiseInformationConfigMock = {
  url: getFranchiseInformationURL,
  successData: MOCKS.getFranchiseMock,
};

const updateFranchiseInformationConfigMock = {
  url: updateFranchiseInformationURL,
  successData: MOCKS.updateFranchiseMock,
};

const getCrisesManagementCardsConfigMock = {
  url: getCrisesManagementCardsURL,
  successData: MOCKS.getCrisesManagementCards,
};

const getCrisesManagementCardDetailConfigMock = {
  url: getCrisesManagementCardDetailURL,
  successData: MOCKS.getCrisesManagementCardDetail,
};

const updateCrisesManagementCardConfigMock = {
  url: updateCrisesManagementCardURL,
  successData: MOCKS.updateCrisesManagementCard,
};

const getAllTopicsConfigMock = {
  url: getAllTopicsURL,
  successData: MOCKS.getAllTopics,
};

const getFranchiseAreas = {
  url: getFranchiseAreasURL,
  successData: MOCKS.getFranchiseAreas,
};

const createFranchiseArea = {
  url: createFranchiseAreaURL,
  successData: MOCKS.getFranchiseAreas[0],
};

const updateFranchiseArea = {
  url: updateFranchiseAreaURL,
  successData: { success: true },
};

const deleteFranchiseArea = {
  url: deleteFranchiseAreaURL,
  successData: { success: true },
};

export default [
  getFranchiseInformationConfigMock,
  updateFranchiseInformationConfigMock,
  getCrisesManagementCardsConfigMock,
  getCrisesManagementCardDetailConfigMock,
  updateCrisesManagementCardConfigMock,
  getAllTopicsConfigMock,
  getFranchiseAreas,
  createFranchiseArea,
  updateFranchiseArea,
  deleteFranchiseArea,
];

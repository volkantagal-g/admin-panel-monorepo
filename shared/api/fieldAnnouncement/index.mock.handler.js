import * as MOCKS from './index.mock.data';

const exAnnouncementId = '63dbd29c5311ea1759a5837c';
const createFranchiseAnnouncementURL = '/fieldAnnouncement/announcement';
const getAnnouncementsURL = '/fieldAnnouncement/announcement/filter';
const getFranchisesURL = '/marketFranchise/getMarketFranchises';
const getWarehouseAnnouncementsURL = '/fieldAnnouncement/warehouse-announcements/filter';
const getFranchiseAnnouncementDetailURL = `/fieldAnnouncement/announcement/${exAnnouncementId}`;

const createFranchiseAnnouncementConfigMock = {
  url: createFranchiseAnnouncementURL,
  successData: MOCKS.createFranchiseAnnouncementMock,
};

const getAnnouncementsConfigMock = {
  url: getAnnouncementsURL,
  successData: MOCKS.getAnnouncementsMock,
};

const getWarehouseAnnouncementsConfigMock = {
  url: getWarehouseAnnouncementsURL,
  successData: MOCKS.getWarehouseAnnouncementsMock,
};

const getFranchiseAnnouncementDetailConfigMock = {
  url: getFranchiseAnnouncementDetailURL,
  successData: MOCKS.getFranchiseAnnouncementDetailMock,
  method: 'get',
};

export const getFranchisesConfigMock = {
  url: getFranchisesURL,
  successData: MOCKS.getFranchisesMock,
};

export default [
  createFranchiseAnnouncementConfigMock,
  getAnnouncementsConfigMock,
  getWarehouseAnnouncementsConfigMock,
  getFranchiseAnnouncementDetailConfigMock,
];

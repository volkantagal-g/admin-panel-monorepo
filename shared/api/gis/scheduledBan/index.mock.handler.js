import * as MOCKS from './index.mock.data';

const getAllScheduledBansUrl = '/gis/scheduledBan/getAllScheduledBans';
const getAllScheduledBansMockOptions = {
  url: getAllScheduledBansUrl,
  method: 'post',
  successData: MOCKS.mockedScheduledBanPolygons,
};

const deleteScheduledBannedAreaUrl = `/gis/scheduledBan/deleteScheduledBannedArea/${MOCKS.mockedScheduledBanPolygons.features[0].properties.id}`;
const deleteScheduledBannedAreaMockOptions = {
  url: deleteScheduledBannedAreaUrl,
  method: 'delete',
  successData: { success: true },
};

const createScheduledBannedAreaUrl = '/gis/scheduledBan/createScheduledBannedArea';
const createScheduledBannedAreaMockOptions = {
  url: createScheduledBannedAreaUrl,
  method: 'post',
  successData: { success: true },
};

export default [
  getAllScheduledBansMockOptions,
  deleteScheduledBannedAreaMockOptions,
  createScheduledBannedAreaMockOptions,
];

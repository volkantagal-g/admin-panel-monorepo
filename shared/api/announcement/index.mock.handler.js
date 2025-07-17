import * as MOCKS from './index.mock.data';

const getAnnouncementByIdUrl = '/announcement/get/:id';

const getAnnouncementByIdMockOptions = {
  method: 'get',
  url: getAnnouncementByIdUrl,
  successData: MOCKS.mockedAnnouncement,
};

export default [getAnnouncementByIdMockOptions];

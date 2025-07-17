import { sampleAnnouncementResponse, SAMPLE_ANNOUNCEMENT_ID } from './index.mock.data';

const getAnnouncementUrl = `/announcement/get/${SAMPLE_ANNOUNCEMENT_ID}`;

export const getAnnouncementMock = {
  url: getAnnouncementUrl,
  successData: { data: sampleAnnouncementResponse },
  method: 'get',
};

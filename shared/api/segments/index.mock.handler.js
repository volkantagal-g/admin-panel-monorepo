import * as MOCKS from './index.mock.data';

const getSegmentMockOptions = {
  url: '/segment/getSegment',
  successData: { segment: MOCKS.mockedSegments[0] },
};

const getSegmentsMockOptions = {
  url: '/segment/filterSegments',
  successData: { segments: MOCKS.mockedSegments },
};

const resetClientsOfSegmentMockOptions = {
  url: '/segment/resetClients',
  successData: { success: true },
};

export default [getSegmentMockOptions, getSegmentsMockOptions, resetClientsOfSegmentMockOptions];

import * as MOCKS from './index.mock.data';

export const getMockedAttachmentResponse = {
  url: `/clientAttachments/${MOCKS.mockedSessionId}/${MOCKS.mockedAttachmentId}`,
  method: 'get',
  successData: MOCKS.mockedAttachment,
};

export default [
  getMockedAttachmentResponse,
];

import axios from '@shared/axios/common';
import { GetAttachmentURLResponseType } from './types';

export const getAttachmentURL = async ({
  sessionId,
  attachmentId,
}: {
  sessionId: string,
  attachmentId: string
}) => {
  const response = await axios({
    method: 'GET',
    url: `/clientAttachments/${sessionId}/${attachmentId}`,
  });

  const attachment = response.data as GetAttachmentURLResponseType;
  return attachment;
};

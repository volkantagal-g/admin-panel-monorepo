import { getLimitAndOffset } from '@shared/utils/common';

export const addThumbUrlToFiles = (files = []) => files.map(file => ({ thumbUrl: file.signedS3Link, name: file.fileName }));

export const getCrisisLogsRequestParams = ({ franchiseId, cardNumber, pagination }) => {
  const requestData = {
    ...{ franchiseId },
    ...getLimitAndOffset(pagination),
  };
  if (cardNumber) {
    requestData.cardNumber = parseInt(cardNumber, 10);
  }
  return requestData;
};

export const getCrisisLogExcelRequestParams = ({ franchiseId, cardNumber }) => {
  const requestData = { franchiseId };
  if (cardNumber) {
    requestData.cardNumber = parseInt(cardNumber, 10);
  }
  return requestData;
};

export const getCrisisCardListRequestParams = ({ franchiseId, topicId, pagination }) => {
  const requestData = {
    ...{ franchiseId },
    ...getLimitAndOffset(pagination),
  };
  if (topicId) {
    requestData.topicId = topicId;
  }
  return requestData;
};

export const getCrisisCardListExcelRequestParams = ({ franchiseId, topicId }) => {
  const requestData = { franchiseId };
  if (topicId) {
    requestData.topicId = topicId;
  }
  return requestData;
};

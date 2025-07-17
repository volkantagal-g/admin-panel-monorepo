import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONTENT_UPLOAD.S3;

export const uploadDocumentUrlSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'uploadDocumentUrl');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'uploadDocumentUrl');
    },
    ({ data }) => {
      return data?.cdnUrl || null;
    },
  ),
};

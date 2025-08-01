import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.UNIQUE_IDENTIFIER}_`;

export const {
  Types,
  Creators,
} = createActions({
  getUniqueIdentifierRequest: {
    filters: { assetTypeId: null } as any,
    onSuccess: () => {},
    onError: () => {},
  } as any,
  initContainer: null,
  destroyContainer: null,
}, { prefix });

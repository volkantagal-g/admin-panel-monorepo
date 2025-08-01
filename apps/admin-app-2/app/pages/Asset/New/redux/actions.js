import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createAssetRequest: { body: null },
  createAssetSuccess: { data: [] },
  createAssetFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.ASSET.NEW}_` });

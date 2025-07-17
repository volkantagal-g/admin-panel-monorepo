import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getArtisanStoresByNameRequest: { searchString: '' },
  getArtisanStoresByNameSuccess: { data: [] },
  getArtisanStoresByNameFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.ARTISAN_STORE}_` });

import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFavoritePagesRequest: null,
  getFavoritePagesSuccess: { data: [] },
  getFavoritePagesFailure: { error: null },
  updateFavoritePagesRequest: { favoritePages: {} },
  updateFavoritePagesFailure: { error: null },
  initSidebar: null,
  destroySidebar: null,
}, { prefix: `${REDUX_KEY.SIDEBAR}_` });

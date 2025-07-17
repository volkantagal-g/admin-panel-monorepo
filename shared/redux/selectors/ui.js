import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getState } from '@shared/utils/redux';

const reduxKey = `${REDUX_KEY.UI}`;

export const getPageTitle = createSelector(
  state => {
    return getState({ state, reduxKey, key: 'pageTitle', initialState: { pageTitle: '' } });
  },
  pageTitle => {
    return pageTitle;
  }
);

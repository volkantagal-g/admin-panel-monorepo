import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.UI}_`;
export const { Types, Creators } = createActions(
  { setPageTitle: { pageTitle: null } },
  { prefix });

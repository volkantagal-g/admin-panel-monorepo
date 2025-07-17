import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

// eslint-disable-next-line max-len
export const { Types, Creators } = createActions({ setVisibility: { data: false } }, { prefix: `${REDUX_KEY.HELPER.HELPER_COUNTRY_SELECTION_MODAL}_` });

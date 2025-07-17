import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.PICKER.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getPickerListRequest: null,
    getPickerListSuccess: { data: [] },
    getPickerListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);

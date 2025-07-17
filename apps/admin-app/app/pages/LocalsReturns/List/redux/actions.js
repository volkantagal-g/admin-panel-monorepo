import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getReturnRequest: { filterData: {} },
    getReturnRequestSuccess: { data: [] },
    getReturnRequestFailure: { error: null },
    getReturnDetailRequest: { returnId: '' },
    getReturnDetailRequestSuccess: { data: {} },
    getReturnDetailRequestFailure: { error: null },
    getReturnStatusesRequest: { onSuccess: null },
    searchShops: { keyword: null, onSuccess: null, onFinished: null },
    postReturnRespondRequest: {
      returnId: '',
      respondType: '',
      successCallback: () => {},
      failCallback: () => {},
    },
    postReturnRespondRequestSuccess: { data: {} },
    postReturnRespondRequestFailure: { error: null },
    setFilter: { key: '', value: null },
    resetFilter: {},
    setDates: { dates: [] },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.RETURNS}_` },
);

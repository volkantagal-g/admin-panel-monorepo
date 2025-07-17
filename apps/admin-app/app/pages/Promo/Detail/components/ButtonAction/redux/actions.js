import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getConfigKeyRequest: { body: null },
    getConfigKeySuccess: { data: {} },
    getConfigKeyFailure: { error: null },
    getLocalsChainsRequest: { body: null },
    getLocalsChainsSuccess: { data: {} },
    getLocalsChainsFailure: { error: null },
    getLocalsMerchantTypesRequest: { body: null },
    getLocalsMerchantTypesSuccess: { data: {} },
    getLocalsMerchantTypesFailure: { error: null },
    getSmartSuggestionsRequest: { body: null },
    getSmartSuggestionsSuccess: { data: {} },
    getSmartSuggestionsFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.BANNER.ACTION}_` },
);

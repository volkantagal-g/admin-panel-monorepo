import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createThirdPartyCompanyRequest: { body: null },
  createThirdPartyCompanySuccess: { thirdPartyCompany: {} },
  createThirdPartyCompanyFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.THIRD_PARTY_COMPANY.NEW}_` });

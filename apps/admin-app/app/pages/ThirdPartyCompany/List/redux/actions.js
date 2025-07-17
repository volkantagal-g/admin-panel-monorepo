import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getThirdPartyCompaniesRequest: null,
  getThirdPartyCompaniesSuccess: { thirdPartyCompanies: [] },
  getThirdPartyCompaniesFailure: { error: null },
  setThirdPartyCompanyFiltersSearchParam: { searchParam: '' },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.THIRD_PARTY_COMPANY.LIST}_` });

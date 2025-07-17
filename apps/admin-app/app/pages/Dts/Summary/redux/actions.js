import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getResultsRequest: { date: {}, franchiseId: null },
  getResultsSuccess: { data: [] },
  getResultsFailure: { error: null },
  getPointsRequest: { startDate: null, endDate: null, franchiseId: null },
  getPointsSuccess: { data: [] },
  getPointsFailure: { error: null },
  getDtsCategoriesRequest: {},
  getDtsCategoriesSuccess: { data: [] },
  getDtsCategoriesFailure: { error: null },
  setFilteredResults: { data: [] },
  setCities: { cities: [] },
  setDomainTypes: { domainTypes: [] },
  setDomainFilterType: { domainFilterType: '' },
  setWarehouseTypes: { warehouseTypes: [] },
  setSearchValue: { searchValue: "" },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DTS.SUMMARY}_` });

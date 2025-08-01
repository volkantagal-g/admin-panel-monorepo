import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getLiveMapDataRequest: { data: {} },
  getLiveMapDataSuccess: { data: [] },
  getLiveMapDataFailure: { error: null },
  getOperationTimeSeriesDataRequest: { data: {} },
  getOperationTimeSeriesDataSuccess: { data: [] },
  getOperationTimeSeriesDataFailure: { error: null },
  setCities: { cities: [] },
  setSelectedCityFilter: { selectedCityFilter: null },
  setSelectedDomainType: { selectedDomainType: '' },
  setDomainFilterType: { domainFilterType: '' },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DAILY_TRACKING.INSTANT}_` });

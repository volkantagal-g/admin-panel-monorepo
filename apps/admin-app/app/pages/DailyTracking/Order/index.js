import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import Filter from './components/Filter';
import Cards from './components/Cards';
import Header from './components/Header';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from './redux/actions';
import {
  getSelectedCountryTimezone,
  getSelectedCities,
} from '@shared/redux/selectors/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ROUTE } from '@app/routes';
import { getInitialEndTime, getInitialStartTime } from './util';
import { filtersSelector } from './redux/selectors';

const Order = () => {
  usePageViewAnalytics({ name: ROUTE.DAILY_TRACKING_ORDER.name, squad: ROUTE.DAILY_TRACKING_ORDER.squad });
  const dispatch = useDispatch();
  const timezone = useSelector(getSelectedCountryTimezone.getData);
  const selectedCountry = getSelectedCountry();
  const selectedCities = useSelector(getSelectedCities.getData);
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);

  const requestData = useCallback((startDate, endDate, domainType, countries, cities) => {
    const params = {
      startDate: startDate.toISOString(),
      /* Due to the new DB structure, when the user selects 14.00 as endTime, it's must be sent as 13.00. Therefore, we subtract 1
       microsecond to get the clock to the previous time.
       We can get the same result by subtract 1 hour, but we used microsecond to support any changes in the future.
      */
      endDate: endDate.clone().startOf('hours').subtract(1, 'milliseconds').toISOString(),
      domainType,
      cities,
    };
    dispatch(Creators.getWarehouseStatsRequest(params));
    dispatch(Creators.getOrderPromoDistributionBetweenDatesRequest(params));
    dispatch(Creators.getRedBasketCountsRequest(params));
    dispatch(Creators.getRateCountsRequest(params));
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
    dispatch(CommonCreators.getCitiesRequest());
    requestData(getInitialStartTime(timezone), getInitialEndTime(timezone), selectedDomainType, selectedCountry, selectedCities);
    return () => {
      dispatch(Creators.destroyPage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }, [dispatch, selectedDomainType]);

  return (
    <>
      <Header />
      <Filter requestData={requestData} />
      <Cards />
    </>
  );
};

const reduxKey = REDUX_KEY.DAILY_TRACKING.ORDER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Order);

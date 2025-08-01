import { useCallback, useEffect } from 'react';
import { compose } from 'redux';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';

import { Dashboard, Filter, Header } from './components';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { filtersSelector } from './redux/selectors';

const getRequestDateRange = timezone => {
  const endDate = moment.tz(timezone).startOf('hour');
  const startDate = endDate.clone().subtract(1, 'hour');
  return {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  };
};

const CourierTrackingPage = () => {
  usePageViewAnalytics({ name: ROUTE.DAILY_TRACKING_INSTANT.name, squad: ROUTE.DAILY_TRACKING_INSTANT.squad });
  const dispatch = useDispatch();
  const selectedCountry = getSelectedCountry();
  const selectedCountryTimezone = useSelector(getSelectedCountryTimezone.getData);
  const selectedCityFilter = useSelector(filtersSelector.getSelectedCityFilter);
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);

  const requestData = useCallback(cityCode => {
    const requestDate = getRequestDateRange();
    const countryCode = selectedCountry?.code.alpha2;
    dispatch(Creators.getLiveMapDataRequest({ data: { selectedCity: cityCode, countryCode } }));
    dispatch(Creators.getOperationTimeSeriesDataRequest({
      data: {
        ...requestDate,
        timezone: selectedCountryTimezone,
        interval_value: 'hour',
        countries: [selectedCountry._id],
        cities: [cityCode],
      },
    }));
    dispatch(CommonCreators.getWarehousesRequest({
      countryId: selectedCountry._id,
      cityId: cityCode,
    }));
  }, [dispatch, selectedCountry, selectedCountryTimezone]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
    return () => dispatch(Creators.destroyPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }, [dispatch, selectedDomainType]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    // If we have selectedCityFilter in localStorage
    // Fetch initial request
    if (selectedCityFilter) {
      requestData(selectedCityFilter);
    }
  }, [dispatch, requestData, selectedCityFilter]);

  return (
    <>
      <Header />
      <Filter requestData={requestData} />
      <Dashboard />
    </>
  );
};

const reduxKey = REDUX_KEY.DAILY_TRACKING.INSTANT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CourierTrackingPage);

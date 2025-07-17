import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';

import { getCitiesSelector } from '@shared/redux/selectors/common';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { REDUX_KEY } from '@shared/shared/constants';
import Header from './components/Header';
import Table from './components/Table';
import Filter from './components/Filter';
import useQuery from '@shared/shared/hooks/useQuery';
import { getCityName } from './utils';
import { getLangKey } from '@shared/i18n';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from './redux/actions';
import useInterval from '@shared/shared/hooks/useInterval';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const CourierLiveMonitoring = () => {
  usePageViewAnalytics({ name: ROUTE.COURIER_LIVE_MONITORING.name, squad: ROUTE.COURIER_LIVE_MONITORING.squad });
  const { pathname: url } = useLocation();
  const dispatch = useDispatch();

  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const query = useQuery();
  const selectedCity = query.get('selectedCity');
  const cityName = getCityName(cities, selectedCity);
  const selectedCityName = cityName ? cityName[getLangKey()] : null;

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
    dispatch(Creators.setFilters({ filters: { selectedCity } }));
    dispatch(Creators.getCourierStatusCountsRequest({ data: { selectedCity } }));
  }, [dispatch, selectedCity]);

  useEffect(() => {
    let newCities;

    if (selectedCity) {
      if (!selectedCityName) {
        return;
      }
      newCities = [selectedCity];
    }

    dispatch(CommonCreators.getFilteredWarehousesRequest({ cities: newCities, fields: '_id name city domainTypes' }));
  }, [dispatch, selectedCity, selectedCityName]);

  useInterval(() => {
    dispatch(Creators.getCourierStatusCountsRequest({ data: { selectedCity } }));
  }, 60000);

  return selectedCity && cities.length && !selectedCityName ? (
    <Navigate to={url} replace />
  ) : (
    <div>
      <Header url={url} selectedCityName={selectedCityName} />
      <Filter url={url} />
      <Table url={url} selectedCity={selectedCity} />
    </div>
  );
};

const reduxKey = REDUX_KEY.LIVE_MONITORING.COURIER_LIVE_MONITORING;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CourierLiveMonitoring);

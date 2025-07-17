import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import useQuery from '@shared/shared/hooks/useQuery';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import Header from './components/Header';
import Table from './components/Table';
import Filter from './components/Filter';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';

const LiveMonitoringPage = () => {
  usePageViewAnalytics({ name: ROUTE.OPERATIONS_LIVE_MONITORING.name, squad: ROUTE.OPERATIONS_LIVE_MONITORING.squad });

  const dispatch = useDispatch();
  useInitAndDestroyPage({
    dispatch,
    Creators,
  });

  const navigate = useNavigate();
  const { pathname: url } = useLocation();
  const query = useQuery();
  const selectedCity = query.get('selectedCity');

  const handleCityClick = useCallback(
    cityId => {
      navigate(`${url}?selectedCity=${cityId}`);
    },
    [navigate, url],
  );

  useEffect(() => {
    dispatch(Creators.fetchInitialData({ selectedCity }));
    // reset search filter
    const filters = { mainColumnSearchText: null };
    dispatch(Creators.setFilters({ filters }));
  }, [dispatch, selectedCity]);

  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const selectedCityName = cities.find(city => city._id === selectedCity)?.name[getLangKey()];

  return (
    <>
      <Header selectedCity={selectedCityName} url={url} />
      <Filter selectedCity={selectedCity} />
      <Table selectedCity={selectedCity} handleCityClick={handleCityClick} />
    </>
  );
};

const reduxKey = REDUX_KEY.LIVE_MONITORING.OPERATIONS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LiveMonitoringPage);

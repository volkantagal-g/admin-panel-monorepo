import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes.ts';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import Filter from './components/Filter';
import Header from './components/Header';
import Table from './components/Table';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.LIVE_MONITORING.LIST;

const OrderGrowthMonitoringPage = () => {
  const { t } = useTranslation(['orderGrowthMonitoring']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.LIVE_MONITORING.name, squad: ROUTE.LIVE_MONITORING.squad });
  const [searchParams] = useSearchParams();

  const selectedCityId = searchParams.get('selectedCity');
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  }, [dispatch]);

  useEffect(() => {
    const getFilteredWarehousesRequestParams = {
      fields: '_id city name domainTypes status',
      ...(!isEmpty(selectedCityId) && { cities: [selectedCityId] }),
    };

    dispatch(CommonCreators.getFilteredWarehousesRequest(getFilteredWarehousesRequestParams));
    if (selectedCityId) {
      dispatch(Creators.setFilters({ selectedCity: selectedCityId }));
      dispatch(Creators.getOrderGrowthMonitoringWarehouseDataRequest());
    }
    else {
      dispatch(Creators.getOrderGrowthMonitoringDataRequest());
    }
  }, [dispatch, selectedCityId]);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <Header />
      <Filter />
      <Table />
    </>
  );
};

export default OrderGrowthMonitoringPage;

import { useEffect, useMemo } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';

import { getSelectedCountry, getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import {
  usePageViewAnalytics,
  useInitAndDestroyPage,
} from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { isMobile } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { filtersSelector } from './redux/selectors';
import Filters from './components/Filters';
import Tables from './components/Tables';

const GetirMarketDashboard = () => {
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.GETIR_MARKET_DASHBOARD.name, squad: ROUTE.GETIR_MARKET_DASHBOARD.squad });

  const { t } = useTranslation('getirMarketDashboardPage');

  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const selectedCountry = getSelectedCountry();
  const selectedDivision = getSelectedCountryDivision();

  const defaultSelectedDivisionCountries = useMemo(() => {
    if (selectedDivision) {
      return [selectedCountry._id];
    }
    return [];
  }, [selectedDivision, selectedCountry]);

  const isDeviceMobile = isMobile();

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getFilteredWarehousesForDivisionRequest({ fields: '_id country city name domainTypes' }));
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
    dispatch(Creators.getNPSConfigRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }, [dispatch, selectedDomainType]);

  useEffect(() => {
    if (!selectedDivision) return;
    dispatch(CommonCreators.getDivisionsCountriesRequest({ division: selectedDivision }));
    dispatch(CommonCreators.getDivisionsCitiesRequest({ division: selectedDivision }));
  }, [dispatch, selectedDivision]);

  return (
    <>
      <PageTitleHeader isDeviceMobile={isDeviceMobile} title={t('PAGE_TITLE')} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Filters defaultSelectedDivisionCountries={defaultSelectedDivisionCountries} />
      </ErrorBoundary>
      <Tables defaultSelectedDivisionCountries={defaultSelectedDivisionCountries} />
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_MARKET.DASHBOARD;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GetirMarketDashboard);

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import {
  // MARKET_PRODUCT_CATEGORY_STATUS,
  REDUX_KEY,
} from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import ErrorFallback from '@shared/components/UI/ErrorFallback';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedCountryDivision, getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import Filters from './components/Filters';
import Table from './components/Table';
import { Creators } from './redux/actions';
import { filtersSelector, isPageInitializedSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.GETIR_MARKET.COMMERCIAL_MONITORING;

const NEEDED_CATEGORY_FIELDS = ['name', 'parent'];

const GetirMarketCommercialMonitoringPage = () => {
  const { t } = useTranslation(['global', 'commercialMonitoringPage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.GETIR_MARKET_COMMERCIAL_MONITORING.name,
    squad: ROUTE.GETIR_MARKET_COMMERCIAL_MONITORING.squad,
  });
  const selectedDomainType = useSelector(filtersSelector.getAllFilters)?.domainType;

  useEffect(() => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }, [dispatch, selectedDomainType]);

  useEffect(() => {
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  }, [dispatch]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const isPageInitialized = useSelector(isPageInitializedSelector);
  const selectedDivision = getSelectedCountryDivision();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const defaultSelectedDivisionCountries = useMemo(() => {
    if (selectedDivision) {
      return [selectedCountry._id];
    }
    return [];
  }, [selectedDivision, selectedCountry]);

  useEffect(() => {
    dispatch(CommonCreators.getMarketProductsRequest({
      fields: ['fullName', 'category', 'subCategory', 'suppliers', 'domainTypes'],
      populate: [],
      useAPIGatewayCache: true,
      supplyFieldsPopulateOptions: {
        isPopulationNeeded: true,
        fields: ['segments'],
      },
      shouldGetSuppliersAndManufacturerFromNewPricingService: true,
    }));
    dispatch(CommonCreators.getMarketProductCategoriesRequest({
      isSubCategory: false,
      // status: MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE, // because there are sales from inactive categories too
      fields: NEEDED_CATEGORY_FIELDS,
    }));
    dispatch(CommonCreators.getMarketProductSubCategoriesRequest({
      // isSubCategory: true, // this is already injected in the saga layer
      // status: MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE, // because there are sales from inactive categories too
      fields: NEEDED_CATEGORY_FIELDS,
    }));
    dispatch(CommonCreators.getSuppliersRequest());
    if (!selectedDivision) {
      dispatch(CommonCreators.getCitiesRequest());
    }
  }, [dispatch, selectedDivision]);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.GETIR_MARKET.COMMERCIAL_MONITORING')} />
      {
        isPageInitialized && (
          <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Filters defaultSelectedDivisionCountries={defaultSelectedDivisionCountries} />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Table />
            </ErrorBoundary>
          </>
        )
      }
    </>
  );
};

export default GetirMarketCommercialMonitoringPage;

import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { isMobile } from '@shared/utils/common';
import {
  REGULAR_WAREHOUSE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
} from '@shared/shared/constants';

import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { REDUCER_KEY, filtersSelector, getSelectedDivisionSelector, getSelectedFilterCountryCode } from './redux/selectors';
import { TheMap, Filter, CourierStatsPanel, OrderStatsPanel, EventPanel } from './components';
import useStyles from './styles';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

function LiveMap() {
  usePageViewAnalytics({ name: ROUTE.GETIR_MARKET_LIVE_MAP.name, squad: ROUTE.GETIR_MARKET_LIVE_MAP.squad });
  const isDeviceMobile = isMobile();
  const dispatch = useDispatch();
  const classes = useStyles({ isDeviceMobile });

  const { t } = useTranslation();

  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const selectedCity = useSelector(filtersSelector.getCity);
  const selectedDivision = useSelector(getSelectedDivisionSelector);
  const selectedFilterCountry = useSelector(filtersSelector.getFilterCountry);
  const selectedCountryId = useSelector(getSelectedCountry)?._id;
  const selectedFilterCountryCode = useSelector(getSelectedFilterCountryCode);
  const selectedDomainType = useSelector(filtersSelector.getDomainType);

  useEffect(() => {
    dispatch(CommonCreators.getDivisionRequest({ countryIds: [selectedCountryId] }));
  }, [dispatch, selectedCountryId]);

  const countryId = selectedDivision && selectedFilterCountry ? selectedFilterCountry : null;

  useEffect(() => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }, [dispatch, selectedDomainType]);

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
    // overwrite the app level selected country if we are in a division and we selected a country
    dispatch(CommonCreators.getCitiesRequest({ countryId }));
  }, [countryId, dispatch]);

  useEffect(() => {
    if (selectedCity) {
      // we want all the warehouses in the country, used in country courier counts table as warehouseMap
      dispatch(CommonCreators.getFilteredWarehousesRequest({
        warehouseTypes: [REGULAR_WAREHOUSE_TYPE, STORE_CONVERSION_WAREHOUSE_TYPE, SC_GROCER_WAREHOUSE_TYPE],
        fields: 'id city country name domainTypes state status location isTestWarehouse',
      }));
    }
  }, [dispatch, selectedCity]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
    dispatch(Creators.startInterval());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCity) return;
    dispatch(
      Creators.getLiveMapDataRequest({
        selectedCity,
        selectedCountryCode: selectedFilterCountryCode,
        selectedDivision: selectedDivision?.id,
      }),
    );
  }, [dispatch, selectedCity, selectedDivision, selectedFilterCountryCode]);

  useEffect(() => {
    if (warehouses.length && selectedCity) {
      dispatch(Creators.setMappedWarehouses({ warehouses }));

      const cityWarehouses = warehouses.filter(w => w.city === selectedCity);
      dispatch(Creators.getInitialCouriersRequest({ data: { warehouseIds: cityWarehouses.map(w => w._id) } }));
      dispatch(Creators.resetFailOrderCounts());
    }
  }, [dispatch, selectedCity, warehouses]);

  return (
    <div className={`${classes.pageContainer} liveMapPageContainer`}>
      <PageTitleHeader isDeviceMobile={isDeviceMobile} title={t('global:PAGE_TITLE.MARKET.LIVE_MAP')} />
      <TheMap />
      <Filter />
      <div className={classes.topRightContainer}>
        <CourierStatsPanel />
        <EventPanel />
      </div>
      <OrderStatsPanel />
    </div>
  );
}

const withSaga = injectSaga({ key: REDUCER_KEY, saga });
const withReducer = injectReducer({ key: REDUCER_KEY, reducer });

export default compose(withReducer, withSaga)(LiveMap);

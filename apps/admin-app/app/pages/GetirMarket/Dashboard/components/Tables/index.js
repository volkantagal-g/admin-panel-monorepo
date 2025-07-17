import { useEffect, Suspense, lazy } from 'react';
import { Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import moment from 'moment';

import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import permKey from '@shared/shared/permKey.json';
import { usePermission, usePrevious } from '@shared/hooks';
import ProductsTable from './ProductsTable';

import useStyles from './styles';
import CardTypes from './CardTypes';
import OrderChannel from './OrderChannel';
import DeliveryFeeDiscount from './DeliveryFeeDiscount';
import PromoTable from './PromoTable';
import OrderGrowthSummary from './OrderGrowthSummary';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import ClientOrderCounts from './ClientOrderCounts';
import NPSStatsTable from './NPSStatsTable';
import OrderChart from '../Charts/Order';
import UtilizationAndCourierChart from '../Charts/UtilAndCourier';
import ThroughputChart from '../Charts/Throughput';
import FinancialThroughputChart from '../Charts/FinancialThroughput';
import { filtersSelector, npsTimeIntervalSelector } from '../../redux/selectors';
import { availableDomainTypesForCountrySelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { getSelectedCountryDivision, getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Creators } from '../../redux/actions';
import { getHours, getIsoDateString } from '../../utils';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import {
  NPS_MIN_ACCEPTABLE_SURVEY_COUNT,
  WAREHOUSE_STATS_TYPES,
} from '../../constants';

const Financials = lazy(() => import(/* webpackPrefetch: true */ './Financials'));
const BasketDistribution = lazy(() => import(/* webpackPrefetch: true */ './BasketDistribution'));
const ClientRating = lazy(() => import(/* webpackPrefetch: true */ './ClientRating'));
const WarehouseTable = lazy(() => import(/* webpackPrefetch: true */ './WarehouseTable'));
const DurationsTable = lazy(() => import(/* webpackPrefetch: true */ './Durations'));
const NewClientStats = lazy(() => import(/* webpackPrefetch: true */ './NewClientStats'));

const Tables = ({ defaultSelectedDivisionCountries }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();

  const selectedDateRange = useSelector(filtersSelector.getSelectedDateRange);
  const { startDate, endDate } = selectedDateRange;
  const selectedHourRange = useSelector(filtersSelector.getSelectedHourRange);
  const [minHour, maxHour] = selectedHourRange;
  const selectedCountryTimezone = useSelector(getSelectedCountryTimezone.getData);
  const selectedCountry = useSelector(getSelectedCountryV2);
  const selectedCities = useSelector(filtersSelector.getSelectedCities);
  const domainTypes = useSelector(filtersSelector.getSelectedDomainType);
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const selectedDivisionCountries = useSelector(filtersSelector.getSelectedDivisionCountries) || defaultSelectedDivisionCountries;
  const selectedDivision = getSelectedCountryDivision();
  const dateType = useSelector(filtersSelector.getDateType);
  const npsTimeInterval = useSelector(npsTimeIntervalSelector.getNPSTimeInterval);
  const npsTimeIntervalPending = useSelector(npsTimeIntervalSelector.getNPSTimeIntervalPending);
  const prevIsAvailableDomainTypesPending = usePrevious(isAvailableDomainTypesPending);

  const hasFinancialsComponentPermission = canAccess(permKey.PAGE_GETIR_MARKET_DASHBOARD_FINANCIALS_COMPONENT);
  const hasProductStatsComponentPermission = canAccess(permKey.PAGE_GETIR_MARKET_DASHBOARD_PRODUCT_STATS_COMPONENT);
  const hasAllDomainSummaryComponentPermission = canAccess(permKey.PAGE_GETIR_MARKET_DASHBOARD_ALL_DOMAINS_SUMMARY_COMPONENT);
  const hasNPSStatsTableComponentPermission = canAccess(permKey.PAGE_GETIR_MARKET_DASHBOARD_COMPONENT_NPS_STATS_TABLE);

  useEffect(
    () => {
      // TODO: find a better solution for this if block. This is temporary solution to prevent multiple requests in page load
      if (
        (prevIsAvailableDomainTypesPending && !isAvailableDomainTypesPending) ||
        (!prevIsAvailableDomainTypesPending && !isAvailableDomainTypesPending)
      ) {
        if (hasFinancialsComponentPermission) {
          dispatch(Creators.getOrderCountByBasketAmountRequest());
          dispatch(Creators.getFinancialsRequest());
        }
        dispatch(Creators.getOrderTimeSeriesRequest());
        dispatch(Creators.getOrderCardGroupDistributionRequest());
        dispatch(Creators.getClientOrderCountsRequest());
        dispatch(Creators.getClientRatingsRequest());
        dispatch(Creators.getDiscountReasonsRequest());
        dispatch(Creators.getDurationsRequest());
        dispatch(Creators.getDeviceStatsRequest());
        dispatch(Creators.getOrderPromoDistributionBetweenDatesRequest());

        if (hasProductStatsComponentPermission &&
          (!selectedDivision || selectedDivisionCountries.length === 1)
        ) {
          dispatch(Creators.getProductAvailabilityRequest());
          dispatch(Creators.getProductSaleRequest());
        }

        if (hasAllDomainSummaryComponentPermission) {
          dispatch(Creators.getBiTaksiStatsRequest({
            data: {
              start_date: getIsoDateString(startDate),
              end_date: getIsoDateString(endDate),
            },
            statsType: WAREHOUSE_STATS_TYPES.CURRENT,
          }));
          dispatch(Creators.getBiTaksiStatsRequest({
            data: {
              start_date: getIsoDateString(moment(startDate).subtract(1, 'week')),
              end_date: getIsoDateString(moment(endDate).subtract(1, 'week')),
            },
            statsType: WAREHOUSE_STATS_TYPES.PREVIOUS,
          }));
          dispatch(Creators.getWaterMarketplaceStatsRequest({
            data: {
              start_date: getIsoDateString(startDate),
              end_date: getIsoDateString(endDate),
            },
            statsType: WAREHOUSE_STATS_TYPES.CURRENT,
          }));
          dispatch(Creators.getWaterMarketplaceStatsRequest({
            data: {
              start_date: getIsoDateString(moment(startDate).subtract(1, 'week')),
              end_date: getIsoDateString(moment(endDate).subtract(1, 'week')),
            },
            statsType: WAREHOUSE_STATS_TYPES.PREVIOUS,
          }));
          dispatch(Creators.getMoovStatsRequest({
            data: {
              domain_types: [],
              start_date: getIsoDateString(startDate),
              end_date: getIsoDateString(endDate),
            },
            statsType: WAREHOUSE_STATS_TYPES.CURRENT,
          }));
          dispatch(Creators.getMoovStatsRequest({
            data: {
              domain_types: [],
              start_date: getIsoDateString(moment(startDate).subtract(1, 'week')),
              end_date: getIsoDateString(moment(endDate).subtract(1, 'week')),
            },
            statsType: WAREHOUSE_STATS_TYPES.PREVIOUS,
          }));
          dispatch(Creators.getDomainSummaryForLocalsRequest({
            data: {
              domainTypes: undefined,
              startDate: getIsoDateString(moment(startDate).subtract(1, 'week')),
              endDate: getIsoDateString(moment(endDate).subtract(1, 'week')),
            },
            statsType: WAREHOUSE_STATS_TYPES.PREVIOUS,
          }));
          dispatch(Creators.getDomainSummaryForLocalsRequest({
            data: {
              domainTypes: undefined,
              startDate: getIsoDateString(startDate),
              endDate: getIsoDateString(endDate),
            },
            statsType: WAREHOUSE_STATS_TYPES.CURRENT,
          }));
          dispatch(
            Creators.getWarehouseStatsRequest({
              data: {
                domain_types: [GETIR_DOMAIN_TYPES.FOOD],
                start_date: getIsoDateString(moment(startDate).subtract(1, 'week')),
                end_date: getIsoDateString(moment(endDate).subtract(1, 'week')),
              },
              statsType: WAREHOUSE_STATS_TYPES.PREVIOUS,
            }),
          );
          dispatch(Creators.getWarehouseStatsRequest({
            data: {
              domain_types: [GETIR_DOMAIN_TYPES.FOOD],
              start_date: getIsoDateString(startDate),
              end_date: getIsoDateString(endDate),
            },
            statsType: WAREHOUSE_STATS_TYPES.CURRENT,
          }));
        }
      }
    },
    [
      startDate,
      endDate,
      minHour,
      dispatch,
      maxHour,
      selectedCountryTimezone,
      selectedCities,
      domainTypes,
      prevIsAvailableDomainTypesPending,
      isAvailableDomainTypesPending,
      selectedCountry,
      selectedDivision,
      hasProductStatsComponentPermission,
      hasFinancialsComponentPermission,
      hasAllDomainSummaryComponentPermission,
      selectedDivisionCountries.length,
    ],
  );

  // domainType modifications have no impact on requests.
  useEffect(
    () => {
      const params = removeEmptyFieldsFromParams({
        start_date: getIsoDateString(startDate),
        end_date: getIsoDateString(endDate),
        hours: getHours(minHour, maxHour, selectedCountryTimezone),
        cities: selectedCities,
      });
      const camelCaseParams = removeEmptyFieldsFromParams({
        startDate: getIsoDateString(startDate),
        endDate: getIsoDateString(endDate),
        hours: getHours(minHour, maxHour, selectedCountryTimezone),
        cities: selectedCities,
      });

      dispatch(Creators.getOperationTimeSeriesRequest());
      dispatch(Creators.getWarehouseStatsV2Request({
        data: removeEmptyFieldsFromParams({
          ...camelCaseParams,
          domainTypes: [GETIR_DOMAIN_TYPES.GETIR10, GETIR_DOMAIN_TYPES.MARKET, GETIR_DOMAIN_TYPES.VOYAGER],
        }),
        statsType: WAREHOUSE_STATS_TYPES.CURRENT,
      })); // warehouse stats table need today data for market domains
      if (hasAllDomainSummaryComponentPermission) {
        dispatch(Creators.getWarehouseStatsV2Request({
          data: removeEmptyFieldsFromParams({
            ...camelCaseParams,
            domainTypes: [GETIR_DOMAIN_TYPES.GETIR10, GETIR_DOMAIN_TYPES.MARKET, GETIR_DOMAIN_TYPES.VOYAGER],
            startDate: getIsoDateString(moment(params.start_date).subtract(1, 'week')),
            endDate: getIsoDateString(moment(params.end_date).subtract(1, 'week')),
          }),
          statsType: WAREHOUSE_STATS_TYPES.PREVIOUS,
        }));
      }

      dispatch(
        Creators.getDashboardComparisonStatsRequest({
          data: removeEmptyFieldsFromParams({
            ...camelCaseParams,
            hours: null,
            domain_types: null,
          }),
        }),
      );
    },
    [
      dispatch,
      endDate,
      maxHour,
      minHour,
      selectedCities,
      selectedCountry,
      startDate,
      dateType,
      selectedCountryTimezone,
      hasAllDomainSummaryComponentPermission,
    ],
  );

  useEffect(() => {
    if (hasNPSStatsTableComponentPermission && !npsTimeIntervalPending && npsTimeInterval) {
      dispatch(Creators.getNPSStatsRequest({
        payload: {
          startDate: toFakeLocalDate(moment().subtract(npsTimeInterval, 'day').startOf('day')),
          endDate: toFakeLocalDate(moment().endOf('day')),
          minAcceptableSurveyCount: NPS_MIN_ACCEPTABLE_SURVEY_COUNT,
        },
      }));
    }
  }, [dispatch, hasNPSStatsTableComponentPermission, npsTimeInterval, npsTimeIntervalPending]);

  useEffect(() => {
    dispatch(
      CommonCreators.getMarketProductsRequest({
        statusList: ['ACTIVE'],
        fields: ['fullName', 'category', 'subCategory', 'suppliers'],
        populate: [],
        useAPIGatewayCache: true,
        shouldGetSuppliersAndManufacturerFromNewPricingService: true,
      }),
    );
    dispatch(CommonCreators.getMarketProductCategoriesRequest({ isSubCategory: false }));
    dispatch(CommonCreators.getMarketProductSubCategoriesRequest());
    dispatch(CommonCreators.getSuppliersRequest());
  }, [dispatch]);

  return (
    <Row gutter={3} className={classes.tableContainer}>
      <Col xs={{ span: 24 }} lg={{ span: 6 }}>
        <Can permKey={permKey.PAGE_GETIR_MARKET_DASHBOARD_PRODUCT_STATS_COMPONENT}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ProductsTable defaultSelectedDivisionCountries={defaultSelectedDivisionCountries} />
          </ErrorBoundary>
        </Can>
        <Can permKey={permKey.PAGE_GETIR_MARKET_DASHBOARD_FINANCIALS_COMPONENT}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Financials />
          </ErrorBoundary>
        </Can>
        <Row gutter={4}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <ClientOrderCounts />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Spin />}>
                <NewClientStats />
              </Suspense>
            </ErrorBoundary>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Can permKey={permKey.PAGE_GETIR_MARKET_DASHBOARD_FINANCIALS_COMPONENT}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Spin />}>
                  <BasketDistribution />
                </Suspense>
              </ErrorBoundary>
            </Can>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Spin />}>
                <ClientRating />
              </Suspense>
            </ErrorBoundary>
          </Col>
        </Row>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 6 }}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <OrderChart />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UtilizationAndCourierChart />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThroughputChart />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <FinancialThroughputChart />
        </ErrorBoundary>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 8 }}>
        <Can permKey={permKey.PAGE_GETIR_MARKET_DASHBOARD_ALL_DOMAINS_SUMMARY_COMPONENT}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <OrderGrowthSummary />
          </ErrorBoundary>
        </Can>
        <div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Spin />}>
              <WarehouseTable />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Spin />}>
              <DurationsTable />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 4 }} className={classes.smallColumn}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PromoTable />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <DeliveryFeeDiscount />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CardTypes />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <OrderChannel />
        </ErrorBoundary>
        <Can permKey={permKey.PAGE_GETIR_MARKET_DASHBOARD_COMPONENT_NPS_STATS_TABLE}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <NPSStatsTable />
          </ErrorBoundary>
        </Can>
      </Col>
    </Row>
  );
};

export default Tables;

import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import { domainSummaryTableDataSelector } from '../../redux/selectors';
import { FilterWrapper, SingleDateSelect, useFilterValues } from '@shared/containers/Filter';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import { REQUEST_TYPES } from './constants';
import useStyles from './styles';
import {
  GETIR_FOOD,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS,
  GETIR_LOCALS_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { getPreviousDatesBeforeToday } from './utils';

const Filter = () => {
  const filterKey = 'growthDashboard';
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const { values } = useFilterValues(filterKey);

  const selectedDateRange = values[filterKey]?.selectedDateRange;

  const isPending = useSelector(domainSummaryTableDataSelector.getIsPending);

  // dispatch actions to fetch the data from here
  const handleFetchRequests = useCallback(() => {
    if (isEmpty(selectedDateRange)) return;

    const currentDateRange = {
      start: selectedDateRange.startDate.clone().valueOf(),
      end: selectedDateRange.endDate.clone().valueOf(),
    };
    const previousWeekDateRange = {
      start: selectedDateRange.startDate.clone().subtract(7, 'days').valueOf(),
      end: selectedDateRange.endDate.clone().subtract(7, 'days').valueOf(),
    };

    dispatch(
      Creators.getRawDataByDateAndTypeRequest({
        data: { filters: { dateRanges: [currentDateRange] } },
        requestType: REQUEST_TYPES.CURRENT,
      }),
    );
    dispatch(
      Creators.getRawDataByDateAndTypeRequest({
        data: { filters: { dateRanges: [previousWeekDateRange] } },
        requestType: REQUEST_TYPES.PREVIOUS,
      }),
    );

    dispatch(
      Creators.getOrderCountsOfDeliveryTypesRequest({
        data: {
          filters: {
            deliveryTypes: Object.values(GETIR_FOOD.DELIVERY_TYPES),
            domainType: GETIR_FOOD_DOMAIN_TYPE,
            dateRanges: [currentDateRange, previousWeekDateRange],
          },
        },
        requestDomain: GETIR_FOOD_DOMAIN_TYPE,
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getOrderCountsOfDeliveryTypesRequest({
        data: {
          filters: {
            deliveryTypes: Object.values(GETIR_LOCALS.DELIVERY_TYPES),
            domainType: GETIR_LOCALS_DOMAIN_TYPE,
            dateRanges: [currentDateRange, previousWeekDateRange],
          },
        },
        requestDomain: GETIR_LOCALS_DOMAIN_TYPE,
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getMissedOrderCountsOfDeliveryTypesRequest({
        data: {
          filters: {
            deliveryTypes: Object.values(GETIR_FOOD.DELIVERY_TYPES),
            domainType: GETIR_FOOD_DOMAIN_TYPE,
            dateRanges: [currentDateRange, previousWeekDateRange],
          },
        },
        requestDomain: GETIR_FOOD_DOMAIN_TYPE,
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getMissedOrderCountsOfDeliveryTypesRequest({
        data: {
          filters: {
            deliveryTypes: Object.values(GETIR_LOCALS.DELIVERY_TYPES),
            domainType: GETIR_LOCALS_DOMAIN_TYPE,
            dateRanges: [currentDateRange, previousWeekDateRange],
          },
        },
        requestDomain: GETIR_LOCALS_DOMAIN_TYPE,
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getNetRevenuesOfDeliveryTypesRequest({
        data: {
          filters: {
            deliveryTypes: Object.values(GETIR_FOOD.DELIVERY_TYPES),
            domainType: GETIR_FOOD_DOMAIN_TYPE,
            dateRanges: [currentDateRange, previousWeekDateRange],
            isNetRevenueTaxExcluded: true,
          },
        },
        requestDomain: GETIR_FOOD_DOMAIN_TYPE,
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getNetRevenuesOfDeliveryTypesRequest({
        data: {
          filters: {
            deliveryTypes: Object.values(GETIR_LOCALS.DELIVERY_TYPES),
            domainType: GETIR_LOCALS_DOMAIN_TYPE,
            dateRanges: [currentDateRange, previousWeekDateRange],
            isNetRevenueTaxExcluded: true,
          },
        },
        requestDomain: GETIR_LOCALS_DOMAIN_TYPE,
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getOrderCountsRequest({
        data: { filters: { dateRanges: [currentDateRange, previousWeekDateRange] } },
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getMissedOrderCountsRequest({
        data: { filters: { dateRanges: [currentDateRange, previousWeekDateRange] } },
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    dispatch(
      Creators.getNetRevenuesRequest({
        data: { filters: { dateRanges: [currentDateRange, previousWeekDateRange], isNetRevenueTaxExcluded: true } },
        timestamps: {
          current: currentDateRange.start,
          previous: previousWeekDateRange.start,
        },
      }),
    );

    // ...
  }, [dispatch, selectedDateRange]);

  useEffect(() => {
    dispatch(CommonCreators.getFilteredWarehousesRequest({ fields: 'city domainTypes name' }));
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const initialRenderRef = useRef();
  useEffect(() => {
    if (!initialRenderRef.current && selectedDateRange) {
      handleFetchRequests();
      initialRenderRef.current = true;
    }
  }, [handleFetchRequests, selectedDateRange]);

  return (
    <Card size="small" bodyStyle={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FilterWrapper filterKey={filterKey}>
          <SingleDateSelect
            defaultDate={moment().subtract(1, 'day').endOf('day')}
            disabledDates={getPreviousDatesBeforeToday}
            className={classes.dateSelect}
            showToday={false}
          />
        </FilterWrapper>
        <Button type="primary" onClick={handleFetchRequests} loading={isPending}>
          {t('APPLY')}
        </Button>
      </ErrorBoundary>
    </Card>
  );
};

export default Filter;

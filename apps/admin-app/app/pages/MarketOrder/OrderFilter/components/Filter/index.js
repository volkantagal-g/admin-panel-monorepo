import { useEffect, useMemo, useState } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { isEmpty } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getLimitAndOffset, getSelectFilterOption } from '@shared/utils/common';
import {
  GETIR_MARKET_DOMAIN_TYPES,
  INTEGRATION_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  INTEGRATION_TYPES,
  MARKET_ACTIVE_ORDER_STATUS,
} from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import useStyles from './styles';
import { Creators, defaultCurrentPage } from '../../redux/actions';
import {
  marketOrderCheckoutErrorCodes,
  platformDeviceTypes,
} from '@shared/shared/constantValues';
import {
  filtersSelector,
  getFilteredWarehousesSelector,
  getFilteredOrdersSelector,
} from '../../redux/selectors';
import {
  getDeviceTypes,
  getFilterStatuses,
  getFormattedSelectOptions,
  getIntegrationType,
} from './utils';
import { orderFilterStatuses } from './constantValues';
import { FILTER_STATUSES } from './constants';
import { MARKET_ORDER_ACTIVE_STATUS_TO_DATE_FIELD } from '@shared/constants/marketOrder';
import {
  Button,
  RangePicker,
  Select,
  Space,
  TextInput,
} from '@shared/components/GUI';

const Filter = ({ isN11 }) => {
  const { t } = useTranslation('orderFilterPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isApplyButtonClicked, setIsApplyButtonClicked] = useState(false);
  const isPending = useSelector(getFilteredOrdersSelector.getIsPending);
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const allWarehouses = useSelector(getFilteredWarehousesSelector.getData);
  const {
    city: selectedCity,
    domainType: selectedDomainType,
    warehouse,
    selectedDateRange,
    status,
    errorCode,
    pagination,
    deviceTypes,
    referenceId,
    integrationType,
    initialStatusForSuccessDuration,
    minDuration,
    maxDuration,
    isSlottedDelivery,
    isFresh,
  } = useSelector(filtersSelector.getData);

  const { startDate, endDate } = selectedDateRange;
  const errorCodes = useMemo(
    () => getFormattedSelectOptions(marketOrderCheckoutErrorCodes),
    [],
  );
  const deviceTypeOptions = useMemo(() => {
    const options = getFormattedSelectOptions(platformDeviceTypes);
    if (integrationType === INTEGRATION_TYPE.JET?.toString()) {
      return options.filter(option => option.label === 'Jet');
    }
    return options.filter(option => option.label !== 'Jet');
  }, [integrationType]);

  const statuses = useMemo(
    () => getFormattedSelectOptions(orderFilterStatuses),
    [],
  );
  const cityOptions = useMemo(() => {
    return cities.map(city => ({
      value: city._id,
      label: city.name[getLangKey()],
    }));
  }, [cities]);

  const domainTypeOptions = useMemo(
    () => GETIR_MARKET_DOMAIN_TYPES.map(value => ({
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${value}`),
      value,
    })),

    [t],
  );

  const warehouseOptions = useMemo(
    () => allWarehouses.map(tag => ({ value: tag._id, label: tag.name })),
    [allWarehouses],
  );

  const freshFilterOptions = [{ label: t('PROVISION_FILTER.YES'), value: true }, { label: t('PROVISION_FILTER.NO'), value: false }];

  const onDateRangeChange = dates => {
    const [start, end] = dates || [];
    // note: clearing the date range returns it to today
    const startAfterCheck = start ? start.startOf('day') : moment().startOf('day');
    const endAfterCheck = end ? end.endOf('day') : moment().endOf('day');

    dispatch(
      Creators.setSelectedDateRange({
        selectedDateRange: {
          startDate: startAfterCheck,
          endDate: endAfterCheck,
        },
      }),
    );
  };

  const hasReferenceIdFilter =
    integrationType !== INTEGRATION_TYPE.GETIR?.toString();

  const onFilter = () => {
    if (initialStatusForSuccessDuration) {
      if (!minDuration && !maxDuration) {
        dispatch(
          ToastCreators.error({ message: t('MIN_MAX_AT_LEAST_ONE_DURATION_REQUIRED') }),
        );
        return;
      }
      if (minDuration && maxDuration && minDuration > maxDuration) {
        dispatch(ToastCreators.error({ message: t('MAX_BIGGER_MIN') }));
        return;
      }
    }
    const { currentPage, rowsPerPage } = pagination;
    setIsApplyButtonClicked(true);
    const selectedDeviceTypes = getDeviceTypes(deviceTypes);
    dispatch(
      Creators.setPagination({
        defaultCurrentPage,
        rowsPerPage: pagination?.rowsPerPage,
      }),
    );
    const paginationFilters = { ...getLimitAndOffset({ currentPage, rowsPerPage }) };

    dispatch(
      Creators.getFilteredOrdersRequest({
        ...paginationFilters,
        domainType: isN11 ? GETIR_MARKET_DOMAIN_TYPE : selectedDomainType,
        city: selectedCity,
        createdAtStart: moment(startDate).startOf('day').toISOString(),
        createdAtEnd: moment(endDate).endOf('day').toISOString(),
        warehouse,
        statuses: getFilterStatuses(status),
        errorCode,
        integrationType: getIntegrationType(
          isN11 ? INTEGRATION_TYPE.N11.toString() : integrationType,
        ),
        deviceTypes: !isEmpty(selectedDeviceTypes) ? selectedDeviceTypes : null,
        referenceId: hasReferenceIdFilter ? referenceId : null,
        excludedIntegrationTypes: !isN11
          ? [INTEGRATION_TYPES.N11.toLowerCase()]
          : null,
        initialStatusForSuccessDuration,
        minDuration,
        maxDuration,
        isSlottedDelivery: !!isSlottedDelivery,
        isFresh,
      }),
    );
  };

  useEffect(() => {
    if (!hasReferenceIdFilter && referenceId) {
      dispatch(Creators.setReferenceId({ referenceId: null }));
    }
  }, [referenceId, hasReferenceIdFilter, dispatch]);

  const statusListForDuration = useMemo(
    () => Object.entries(MARKET_ACTIVE_ORDER_STATUS)
    // only statuses with date field
      .filter(([, val]) => MARKET_ORDER_ACTIVE_STATUS_TO_DATE_FIELD[val])
      .map(([key, val]) => {
        return {
          value: val,
          label: t(`global:MARKET_ORDER_STATUSES:${key}`),
        };
      }),
    [t],
  );

  const orderTypes = [
    { value: 0, label: t('ON_DEMAND') },
    { value: 1, label: t('SLOTTED_ORDERS') },
  ];

  return (
    <Space>
      <Row data-testid="filter-component" gutter={[8, 8]}>
        <Col span={8} md={Date} className={classes.fullWidth}>
          <RangePicker
            value={[startDate, endDate]}
            onChange={onDateRangeChange}
            disabledDate={today => today && today > moment().endOf('day')}
          />
        </Col>
        <Col md={8} className={classes.fullWidth}>
          <Select
            label={t('global:STATUS')}
            value={status}
            optionsData={statuses}
            onChange={value => {
              dispatch(Creators.setStatus({ status: value }));
              // clear initial status and duration when status is changed
              dispatch(
                Creators.setInitialStatusForSuccessDuration({ status: null }),
              );
              dispatch(Creators.setMinDuration({ dur: null }));
              dispatch(Creators.setMaxDuration({ dur: null }));
            }}
            className={classes.fullWidth}
            allowClear
            showSearch
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
          />
        </Col>
        {!isN11 && (
          <Col md={8} className={classes.fullWidth}>
            <Select
              label={t('global:DOMAIN')}
              value={selectedDomainType}
              onChange={domain => {
                dispatch(
                  Creators.setSelectedDomainType({ domainType: domain }),
                );
              }}
              allowClear
              optionsData={domainTypeOptions}
            />
          </Col>
        )}

        <Col md={8} className={classes.fullWidth}>
          <Select
            value={errorCode}
            optionsData={errorCodes}
            label={t('ERROR_TYPE')}
            onChange={value => dispatch(Creators.setErrorCode({ errorCode: value }))}
            className={classes.fullWidth}
            allowClear
            showSearch
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
          />
        </Col>
        <Col md={8} className={classes.fullWidth}>
          <Select
            label={t('global:CITY')}
            onChange={value => dispatch(Creators.setSelectedCity({ city: value }))}
            optionsData={cityOptions}
            value={selectedCity}
            filterOption={getSelectFilterOption}
            allowClear
            showSearch
            optionFilterProp="label"
            className={classes.fullWidth}
            loading={isCitiesPending}
            disabled={isCitiesPending}
          />
        </Col>
        <Col md={8} className={classes.fullWidth}>
          <Select
            value={warehouse}
            label={t('global:WAREHOUSE')}
            onChange={value => dispatch(Creators.setWarehouse({ warehouse: value }))}
            className={classes.fullWidth}
            allowClear
            showSearch
            disabled={!selectedCity}
            optionsData={warehouseOptions}
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
          />
        </Col>
        <Col md={8} className={classes.fullWidth}>
          <Select
            value={deviceTypes}
            mode="multiple"
            label={t('DEVICE_TYPES')}
            onChange={value => dispatch(Creators.setDeviceTypes({ deviceTypes: value }))}
            className={classes.fullWidth}
            allowClear
            showSearch
            optionsData={deviceTypeOptions}
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
          />
        </Col>
        <Col md={8} className={classes.fullWidth}>
          <Select
            value={isSlottedDelivery}
            optionsData={orderTypes}
            label={t('ORDER_TYPE')}
            onChange={value => dispatch(
              Creators.setIsSlottedDelivery({ isSlottedDelivery: value }),
            )}
            className={classes.fullWidth}
            allowClear
            showSearch
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
          />
        </Col>
        <Col md={8} className={classes.fullWidth}>
          <Select
            value={isFresh}
            optionsData={freshFilterOptions}
            label={t('PROVISION')}
            onChange={value => {
              dispatch(
                Creators.setFreshFilter({ isFresh: value }),
              );
            }}
            className={classes.fullWidth}
            allowClear
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
          />
        </Col>
        {status === FILTER_STATUSES.SUCCESS && (
          <>
            <Col md={8} className={classes.fullWidth}>
              <Select
                value={initialStatusForSuccessDuration}
                optionsData={statusListForDuration}
                label={t('STARTING_STATUS')}
                onChange={value => {
                  dispatch(
                    Creators.setInitialStatusForSuccessDuration({ status: value }),
                  );
                  if (!value) {
                    dispatch(Creators.setMinDuration({ dur: null }));
                    dispatch(Creators.setMaxDuration({ dur: null }));
                  }
                }}
                className={classes.fullWidth}
                allowClear
                showSearch
                optionFilterProp="label"
                filterOption={getSelectFilterOption}
              />
            </Col>
            <Col md={4} className={classes.fullWidth}>
              <TextInput
                value={minDuration}
                placeholder={t('MIN_DURATION')}
                onChange={e => {
                  const { value } = e.target;
                  const num = parseInt(value, 10);
                  const nonNan = Number.isNaN(num) ? null : num;
                  dispatch(Creators.setMinDuration({ dur: nonNan }));
                }}
                type="number"
                allowClear
                disabled={!initialStatusForSuccessDuration}
                min={0}
              />
            </Col>
            <Col md={4} className={classes.fullWidth}>
              <TextInput
                value={maxDuration}
                placeholder={t('MAX_DURATION')}
                onChange={e => {
                  const { value } = e.target;
                  const num = parseInt(value, 10);
                  const nonNan = Number.isNaN(num) ? null : num;
                  dispatch(Creators.setMaxDuration({ dur: nonNan }));
                }}
                type="number"
                allowClear
                disabled={!initialStatusForSuccessDuration}
                min={0}
              />
            </Col>
          </>
        )}
        <Col span={24} className="mt-1">
          <Button
            size="small"
            onClick={onFilter}
            disabled={isApplyButtonClicked && isPending}
            className={classes.button}
          >
            {t('global:FILTER')}
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default Filter;

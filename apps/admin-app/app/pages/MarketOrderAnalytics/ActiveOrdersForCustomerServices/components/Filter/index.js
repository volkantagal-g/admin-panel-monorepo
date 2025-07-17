import { useCallback, useMemo } from 'react';
import { Row, Col, Collapse, Select, Button, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector, getCitiesSelector } from '@shared/redux/selectors/common';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS, GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { getPermittedIntegrationTypes } from '@app/pages/MarketOrderAnalytics/integrationTypeUtils';

import { activeOrdersForCustomerServicesSelector, courierDataSelector, filtersSelector, getWarehousesSelector } from '../../redux/selectors';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY, TEST_ID } from '../../constants';
import { Creators, INITIAL_PAGINATION } from '../../redux/actions';
import { getFilteredAndExcludedIntegrationTypes } from '../../utils';
import useStyles from './styles';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES, SLOTTED_STATE } from '@app/pages/MarketOrderAnalytics/constants';

const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation(['global', 'activeOrdersCommon']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const availableIntegrationTypes = useSelector(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const selectedWarehouse = useSelector(filtersSelector.getWarehouseSelector);
  const slottedState = useSelector(filtersSelector.getSlottedState);
  const orderStatuses = useSelector(filtersSelector.getOrderStatuses);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const selectedCity = useSelector(filtersSelector.getSelectedCity);
  const couriers = useSelector(courierDataSelector.getData);
  const isCouriersPending = useSelector(courierDataSelector.getIsPending);
  const selectedIntegrationTypes = useSelector(filtersSelector.getIntegrationTypes);
  const isActiveOrdersPending = useSelector(activeOrdersForCustomerServicesSelector.getIsPending);

  const domainTypeOptions = useMemo(
    () => {
      return availableDomainTypes.map(domainType => {
        return {
          value: domainType,
          label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
        };
      });
    },
    [availableDomainTypes, t],
  );

  const cityOptions = useMemo(
    () => cities.map(city => {
      return {
        value: city._id,
        label: city.name[getLangKey()],
      };
    }),
    [cities],
  );

  const warehouseOptions = useMemo(
    () => warehouses.map(warehouse => {
      return {
        value: warehouse._id,
        label: warehouse.name,
        city: warehouse.city,
      };
    }),
    [warehouses],
  );

  const courierSearchOptions = useMemo(
    () => couriers.map(courier => {
      return {
        value: courier._id,
        label: courier.name,
      };
    }),
    [couriers],
  );

  const slottedStateOptions = [
    {
      value: SLOTTED_STATE.SCHEDULED,
      label: t('activeOrdersCommon:SLOTTED_STATES.SCHEDULED'),
    },
    {
      value: SLOTTED_STATE.ON_DEMAND,
      label: t('activeOrdersCommon:SLOTTED_STATES.ON_DEMAND'),
    },
  ];

  const orderStatusOptions = Object.entries(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES)
    .map(([key, val]) => {
      return {
        value: val,
        label: t(`global:MARKET_ORDER_STATUSES.${key}`),
      };
    });

  const handleDomainTypeChange = domainType => {
    dispatch(Creators.setDomainType({ domainType }));
    dispatch(Creators.setWarehouse({ warehouse: null }));
    dispatch(Creators.setCity({ city: null }));
    dispatch(CommonCreators.setSelectedDomainType({ data: domainType }));
  };

  const handleCityChange = city => {
    dispatch(Creators.setCity({ city }));
    if (selectedWarehouse?.city !== city && !isEmpty(city)) {
      dispatch(Creators.setWarehouse({ warehouse: null }));
    }
  };

  const handleWarehouseChange = (_, warehouse) => {
    dispatch(Creators.setWarehouse({ warehouse }));
  };

  const handleCourierChange = courier => {
    dispatch(Creators.setCourierId({ courierId: courier?.value }));
  };

  const handleIntegrationTypeChange = selectIntegrationTypes => {
    dispatch(Creators.setIntegrationTypes({ integrationTypes: selectIntegrationTypes }));
  };

  const handleSlottedStateTypeChange = selectedSlottedState => {
    dispatch(Creators.setSlottedState({ slottedState: selectedSlottedState }));
  };

  const handleOrderStatusChange = selectedOrderStatuses => {
    dispatch(Creators.setOrderStatuses({ orderStatuses: selectedOrderStatuses }));
  };

  const handleSearch = useCallback(searchValue => {
    dispatch(Creators.getCourierSearchRequest({ name: searchValue }));
  }, [dispatch]);

  const { debouncedCallback } = useDebouncedCallback({
    callback: handleSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const onSearch = useCallback(searchValue => {
    if (searchValue?.trim().length > 2) {
      debouncedCallback(searchValue);
    }
    else {
      debouncedCallback.cancel();
    }
  }, [debouncedCallback]);

  const handleSubmit = () => {
    dispatch(Creators.setPagination(INITIAL_PAGINATION));
    dispatch(Creators.getActiveOrdersForCustomerServicesRequest());
  };

  const permittedIntegrationTypes = useMemo(() => {
    return getPermittedIntegrationTypes({
      canAccess,
      n11AccessKey: INTEGRATION_TYPE_TO_ACCESS_KEY.n11,
      restOfGetirAccessKey: REST_OF_GETIR_ACCESS_KEY,
      availableIntegrationTypes,
    });
  }, [canAccess, availableIntegrationTypes]);

  const shouldShowIntegrationTypeFilter = permittedIntegrationTypes.length > 0;
  const shouldDisableIntegrationTypeFilter = getFilteredAndExcludedIntegrationTypes({
    canAccess,
    permittedIntegrationTypes,
  }).isForced;

  const integrationTypeOptions = useMemo(
    () => permittedIntegrationTypes.map(tag => {
      return {
        value: tag,
        label: tag,
      };
    }),
    [permittedIntegrationTypes],
  );

  const domainTypeSelect = (
    <>
      <label htmlFor={TEST_ID.FILTERS.SELECT_DOMAIN_TYPE}>{t('global:DOMAIN_TYPE')}</label>
      <Select
        value={selectedDomainType}
        options={domainTypeOptions}
        placeholder={t('global:DOMAIN_TYPE')}
        onChange={handleDomainTypeChange}
        optionFilterProp="label"
        id={TEST_ID.FILTERS.SELECT_DOMAIN_TYPE}
        className={classes.fullWidth}
      />
    </>
  );

  const integrationTypeSelect = (
    <>
      <label htmlFor={TEST_ID.FILTERS.SELECT_INTEGRATION_TYPES}>{t('global:INTEGRATION_TYPE')}</label>
      <Select
        mode="multiple"
        options={integrationTypeOptions}
        placeholder={t('global:INTEGRATION_TYPE')}
        filterOption={getSelectFilterOption}
        value={selectedIntegrationTypes}
        onChange={handleIntegrationTypeChange}
        className={classes.fullWidth}
        showSearch
        allowClear
        disabled={shouldDisableIntegrationTypeFilter}
        id={TEST_ID.FILTERS.SELECT_INTEGRATION_TYPES}
      />
    </>
  );

  const citySelect = (
    <>
      <label htmlFor={TEST_ID.FILTERS.SELECT_CITY}>{t('global:CITY')}</label>
      <Select
        value={selectedCity}
        showSearch
        options={cityOptions}
        placeholder={t('global:CITY')}
        onChange={handleCityChange}
        optionFilterProp="label"
        id={TEST_ID.FILTERS.SELECT_CITY}
        className={classes.fullWidth}
        allowClear
        loading={isCitiesPending}
      />
    </>
  );

  const warehouseSelect = (
    <>
      <label htmlFor={TEST_ID.FILTERS.SELECT_WAREHOUSE}>{t('global:WAREHOUSE')}</label>
      <Select
        value={selectedWarehouse}
        options={warehouseOptions}
        placeholder={t('global:WAREHOUSE')}
        onChange={handleWarehouseChange}
        optionFilterProp="label"
        showSearch
        id={TEST_ID.FILTERS.SELECT_WAREHOUSE}
        className={classes.fullWidth}
        allowClear
        loading={isWarehousesPending}
      />
    </>
  );

  const courierSelect = (
    <>
      <label htmlFor={TEST_ID.FILTERS.SELECT_COURIER}>{t('global:COURIER_NAME')}</label>
      <Select
        options={courierSearchOptions}
        placeholder={t('global:COURIER_NAME')}
        onSearch={onSearch}
        id={TEST_ID.FILTERS.SELECT_COURIER}
        className={classes.fullWidth}
        showSearch
        allowClear
        labelInValue
        filterOption={false}
        loading={isCouriersPending}
        notFoundContent={isCouriersPending ? <Spin size="small" /> : null}
        onChange={handleCourierChange}
      />
    </>
  );

  const slottedStateSelect = (
    <>
      <label className="w-100" htmlFor="slotted-state-select">
        {t('activeOrdersCommon:SLOTTED_STATE_LABEL')}
      </label>
      <Select
        id="slotted-state-select"
        value={slottedState}
        placeholder={t('activeOrdersCommon:SLOTTED_STATE_LABEL')}
        onChange={handleSlottedStateTypeChange}
        className={classes.fullWidth}
        allowClear
        options={slottedStateOptions}
        optionFilterProp="label"
      />
    </>
  );

  const orderStatusSelect = (
    <>
      <label className="w-100" htmlFor="order-status-select">{t('global:STATUS')}</label>
      <Select
        id="order-status-select"
        maxTagCount="responsive"
        mode="multiple"
        value={orderStatuses}
        placeholder={t('global:STATUS')}
        onChange={handleOrderStatusChange}
        className={classes.fullWidth}
        allowClear
        options={orderStatusOptions}
        optionFilterProp="label"
      />
    </>
  );

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Row gutter={[8, 8]} className={classes.customRow}>
              <Col xs={12} sm={12} md={12} lg={8} xl={3}>{domainTypeSelect}</Col>

              {shouldShowIntegrationTypeFilter && <Col xs={12} sm={12} md={12} lg={8} xl={3}>{integrationTypeSelect}</Col>}

              <Col xs={24} sm={12} md={12} lg={8} xl={3}>{slottedStateSelect}</Col>

              <Col xs={24} sm={12} lg={8} xl={3}>{citySelect}</Col>

              <Col xs={24} sm={24} lg={8} xl={4}>{warehouseSelect}</Col>

              <Col xs={24} sm={24} lg={8} xl={4}>{courierSelect}</Col>

              <Col xs={24} sm={24} lg={8} xl={4}>{orderStatusSelect}</Col>
            </Row>
            <Row gutter={[8, 8]} justify="end" className={classes.customRow}>
              <Col>
                <Button md={6} type="primary" onClick={handleSubmit} loading={isActiveOrdersPending}>
                  {t('global:APPLY')}
                </Button>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;

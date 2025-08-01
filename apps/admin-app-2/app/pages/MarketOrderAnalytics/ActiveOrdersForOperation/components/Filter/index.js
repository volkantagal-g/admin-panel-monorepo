import { useCallback, useEffect, useMemo, useState } from 'react';
import { Collapse, Select, Row, Col, Input, Button, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import {
  DEFAULT_DEBOUNCE_MS,
  GETIR_MARKET_DOMAIN_TYPES,
} from '@shared/shared/constants';
import {
  availableDomainTypesForCountrySelector,
  availableIntegrationTypesForCountrySelector,
  getCitiesSelector,
  getFilteredWarehousesSelector,
} from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { usePermission } from '@shared/hooks';
import { getPermittedIntegrationTypes } from '@app/pages/MarketOrderAnalytics/integrationTypeUtils';

import { INTEGRATION_TYPE_TO_ACCESS_KEY, ORDER_STATUS_FOR_OPERATION_PAGE, REST_OF_GETIR_ACCESS_KEY, TEST_ID } from '../../constants';
import { filtersSelector, getFilteredWarehouses, getFilteredFieldManagers, getCourierSearch } from '../../redux/selectors';
import { getFilteredAndExcludedIntegrationTypes } from '../../utils';
import useStyles from './styles';
import { SelectWithSelectAll } from '@app/pages/MarketOrderAnalytics/components/SelectWithSelectAll';

const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation('activeOrdersForOperationPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  // all warehouses from selected domainType and city
  const allWarehouses = useSelector(getFilteredWarehousesSelector.getData);
  const isWarehousesRequestPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const isFieldManagersLoading = useSelector(getFilteredFieldManagers.getIsPending);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const couriers = useSelector(getCourierSearch.getData);
  const isCouriersPending = useSelector(getCourierSearch.getIsPending);
  const availableIntegrationTypes = useSelector(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);

  useEffect(() => {
    if (!allWarehouses?.length) {
      // if no warehouse, just reset the field managers
      dispatch(Creators.resetFieldManagers());
      return;
    }

    // To show all available field managers inside the select
    // we need the list of all available field managers from all available warehouses
    // One manager can manage multiple warehouses, one warehouse can have multiple managers
    // we need unique ids
    const fieldManagersSet = new Set();

    allWarehouses.forEach(warehouse => {
      if (warehouse?.fieldManagers?.length) {
        warehouse.fieldManagers.forEach(managerId => {
          fieldManagersSet.add(managerId);
        });
      }
    });

    if (fieldManagersSet.size) {
      dispatch(Creators.getFieldManagersRequest({ employeeIds: Array.from(fieldManagersSet) }));
    }
    else {
      // if there are warehouses but with no field managers, just reset the field managers
      dispatch(Creators.resetFieldManagers());
    }
  }, [dispatch, allWarehouses]);

  // warehouses filtered with selected field managers
  const warehousesForSelect = useSelector(getFilteredWarehouses);
  const fieldManagersForSelect = useSelector(getFilteredFieldManagers.getData);
  const selectedDomainType = useSelector(filtersSelector.getDomainType);
  const selectedCity = useSelector(filtersSelector.getCity);

  const selectedFieldManagers = useSelector(filtersSelector.getFieldManagers);
  const selectedWarehouses = useSelector(filtersSelector.getWarehouses);
  const isSlottedDelivery = useSelector(filtersSelector.getIsSlottedDelivery);
  const orderStatus = useSelector(filtersSelector.getOrderStatus);
  const orderStatusMoreThan = useSelector(filtersSelector.getOrderStatusMoreThan);
  const pagination = useSelector(filtersSelector.getPagination);
  const selectedIntegrationTypes = useSelector(filtersSelector.getIntegrationTypes);

  const [activeKey, setActiveKey] = useState(['operationActiveOrders']);

  const refreshWarehouses = ({ domainType, city }) => {
    dispatch(CommonCreators.getFilteredWarehousesRequest({
      cities: city ? [city] : undefined,
      domainTypes: [domainType],
      fields: '_id name fieldManagers city',
    }));
  };

  const handleDomainTypeChange = selectDomainType => {
    dispatch(Creators.setDomainType({ domainType: selectDomainType }));
    dispatch(Creators.setCity({ city: null }));
    dispatch(Creators.setFieldManagers({ fieldManagers: [] }));
    dispatch(Creators.setWarehouses({ warehouses: [] }));
    dispatch(CommonCreators.setSelectedDomainType({ data: selectDomainType }));
    refreshWarehouses({ domainType: selectDomainType, city: selectedCity });
  };

  const handleCityChange = selectCity => {
    dispatch(Creators.setCity({ city: selectCity }));
    refreshWarehouses({ domainType: selectedDomainType, city: selectCity });

    const warehouseCities = selectedWarehouses?.map(w => w.city);
    // if selected city is not in the selected warehouses, reset the warehouses
    if (!warehouseCities?.every(city => city === selectCity) && !isEmpty(selectCity)) {
      dispatch(Creators.setFieldManagers({ fieldManagers: [] }));
      dispatch(Creators.setWarehouses({ warehouses: [] }));
    }
  };

  const handleFieldManagerChange = selectFieldManagers => {
    dispatch(Creators.setFieldManagers({ fieldManagers: selectFieldManagers }));
  };

  const handleWarehouseChange = (_, selectWarehouses) => {
    dispatch(Creators.setWarehouses({ warehouses: selectWarehouses }));
  };

  const handleIsSlottedDeliveryChange = value => {
    dispatch(Creators.setIsSlottedDelivery({ isSlottedDelivery: value }));
  };

  const handleStatusChange = selectStatus => {
    dispatch(Creators.setOrderStatus({ orderStatus: selectStatus }));
    if (!selectStatus?.length) {
      dispatch(Creators.setOrderStatusMoreThan({ orderStatusMoreThan: null }));
    }
  };

  const handleSearch = useCallback(searchValue => {
    dispatch(Creators.getCourierSearchRequest({ courierName: searchValue }));
  }, [dispatch]);
  const { debouncedCallback } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });
  const handleCourierNameSearch = useCallback(searchValue => {
    if (searchValue?.trim().length > 2) {
      debouncedCallback(searchValue);
    }
    else {
      debouncedCallback.cancel();
    }
  }, [debouncedCallback]);

  const courierSearchOptions = useMemo(
    () => couriers.map(courier => {
      return { value: courier._id, label: courier.name };
    }),
    [couriers],
  );

  const handleCourierNameChange = courier => {
    dispatch(Creators.setCourierId({ courierId: courier }));
  };
  const handleBringClick = () => {
    // prevent when no domainType
    if (!selectedDomainType) {
      dispatch(ToastCreators.error({ message: t('REQUIRED_DOMAIN_TYPE') }));
      return;
    }
    // reset pagination to 1
    const newPagination = { currentPage: 1, rowsPerPage: pagination.rowsPerPage };
    dispatch(Creators.setPagination(newPagination));

    dispatch(Creators.getActiveOrdersRequest());
    dispatch(Creators.getActiveOrderStatsRequest());
  };

  function handleMoreThanChange(e) {
    let parsedValue = null;
    if (e.target.value != null) {
      parsedValue = parseInt(e.target.value, 10);
      parsedValue = parsedValue < 0 ? null : parsedValue;
    }
    dispatch(Creators.setOrderStatusMoreThan({ orderStatusMoreThan: parsedValue }));
  }

  const handleIntegrationTypeChange = selectIntegrationType => {
    dispatch(Creators.setIntegrationTypes({ integrationTypes: selectIntegrationType }));
  };

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
      return { value: city._id, label: city.name[getLangKey()] };
    }),
    [cities],
  );

  const fieldManagerOptions = useMemo(
    () => fieldManagersForSelect.map(fm => {
      return { value: fm._id, label: fm.fullName };
    }),
    [fieldManagersForSelect],
  );

  const warehouseOptions = useMemo(
    () => warehousesForSelect.map(tag => {
      return { value: tag._id, label: tag.name, city: tag.city };
    }),
    [warehousesForSelect],
  );

  const slottedStateOptions = [
    {
      value: true,
      label: t('SLOTTED'),
    },
    {
      value: false,
      label: t('NOT_SLOTTED'),
    },
  ];

  const statusList = useMemo(
    () => Object.entries(ORDER_STATUS_FOR_OPERATION_PAGE).map(([key, val]) => {
      return { value: val, label: t(`global:MARKET_ORDER_STATUSES:${key}`) };
    }),
    [t],
  );

  // domainType required
  const isBringEnabled = selectedDomainType;

  const permittedIntegrationTypes = useMemo(() => {
    return getPermittedIntegrationTypes({
      canAccess,
      n11AccessKey: INTEGRATION_TYPE_TO_ACCESS_KEY.n11,
      restOfGetirAccessKey: REST_OF_GETIR_ACCESS_KEY,
      availableIntegrationTypes,
    });
  }, [canAccess, availableIntegrationTypes]);

  const shouldShowIntegrationTypeFilter = permittedIntegrationTypes.length > 0;
  const shouldDisableIntegrationTypeFilter = getFilteredAndExcludedIntegrationTypes({ canAccess, permittedIntegrationTypes }).isForced;

  const integrationTypeOptions = useMemo(
    () => permittedIntegrationTypes.map(tag => {
      return { value: tag, label: tag };
    }),
    [permittedIntegrationTypes],
  );

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse
          activeKey={activeKey}
          onChange={key => {
            setActiveKey(key);
          }}
        >
          <Panel header={t('global:FILTER')} key="operationActiveOrders" on>
            <Row gutter={8} className={classes.customRow}>
              <Col md={4} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.SELECT_DOMAIN_TYPE}>{t('global:DOMAIN_TYPE')}</label>
                <Select
                  value={selectedDomainType}
                  options={domainTypeOptions}
                  placeholder={t('global:DOMAIN_TYPE')}
                  onChange={handleDomainTypeChange}
                  className={classes.fullWidth}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  id={TEST_ID.FILTERS.SELECT_DOMAIN_TYPE}
                  data-testid={TEST_ID.FILTERS.SELECT_DOMAIN_TYPE}
                  showSearch
                />
              </Col>
              {
                shouldShowIntegrationTypeFilter && (
                <Col md={4} className={classes.fullWidth}>
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
                    data-testid={TEST_ID.FILTERS.SELECT_INTEGRATION_TYPES}
                  />
                </Col>
                )
              }
              <Col md={5} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.SELECT_CITY}>{t('global:CITY')}</label>
                <Select
                  value={selectedCity}
                  options={cityOptions}
                  placeholder={t('global:CITY')}
                  onChange={handleCityChange}
                  className={classes.fullWidth}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  showSearch
                  allowClear
                  id={TEST_ID.FILTERS.SELECT_CITY}
                  data-testid={TEST_ID.FILTERS.SELECT_CITY}
                />
              </Col>
              <Col md={6} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.SELECT_FIELD_MANAGER}>{t('FIELD_MANAGER')}</label>
                <Select
                  value={selectedFieldManagers}
                  mode="multiple"
                  placeholder={t('global:FIELD_MANAGER')}
                  onChange={handleFieldManagerChange}
                  className={classes.fullWidth}
                  allowClear
                  notFoundContent={isFieldManagersLoading ? <Spin size="small" /> : undefined}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  options={fieldManagerOptions}
                  id={TEST_ID.FILTERS.SELECT_FIELD_MANAGER}
                  data-testid={TEST_ID.FILTERS.SELECT_FIELD_MANAGER}
                />
              </Col>
              <Col md={5} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.SELECT_COURIER_FILTER}>{t('COURIER_NAME')}</label>
                <Select
                  placeholder={t('global:COURIER_NAME')}
                  onSearch={handleCourierNameSearch}
                  onChange={handleCourierNameChange}
                  className={classes.fullWidth}
                  allowClear
                  showSearch
                  filterOption={false}
                  notFoundContent={isCouriersPending ? <Spin size="small" /> : undefined}
                  optionFilterProp="label"
                  options={courierSearchOptions}
                  id={TEST_ID.FILTERS.SELECT_COURIER_FILTER}
                  data-testid={TEST_ID.FILTERS.SELECT_COURIER_FILTER}
                />
              </Col>
            </Row>
            <Row gutter={8} className={classes.customRow}>
              <Col md={6} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.SELECT_WAREHOUSE}>{t('global:WAREHOUSE')}</label>
                <Select
                  value={selectedWarehouses}
                  mode="multiple"
                  placeholder={t('global:WAREHOUSE')}
                  onChange={handleWarehouseChange}
                  className={classes.fullWidth}
                  allowClear
                  notFoundContent={isWarehousesRequestPending ? <Spin size="small" /> : undefined}
                  options={warehouseOptions}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  id={TEST_ID.FILTERS.SELECT_WAREHOUSE}
                  data-testid={TEST_ID.FILTERS.SELECT_WAREHOUSE}
                />
              </Col>
              <Col md={4} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.SELECT_IS_SLOTTED_DELIVERY}>{t('SLOT_STATE')}</label>
                <Select
                  placeholder={t('SLOT_STATE')}
                  value={isSlottedDelivery}
                  onChange={handleIsSlottedDeliveryChange}
                  options={slottedStateOptions}
                  allowClear
                  className={classes.fullWidth}
                  id={TEST_ID.FILTERS.SELECT_IS_SLOTTED_DELIVERY}
                />
              </Col>
              <Col md={7} className={classes.fullWidth}>
                <SelectWithSelectAll
                  label={<label htmlFor={TEST_ID.FILTERS.SELECT_ORDER_STATUS}>{t('global:STATUS')}</label>}
                  value={orderStatus}
                  mode="multiple"
                  placeholder={t('global:STATUS')}
                  onChange={handleStatusChange}
                  className={classes.fullWidth}
                  id={TEST_ID.FILTERS.SELECT_ORDER_STATUS}
                  showSearch
                  showArrow
                  allowClear
                  filterOption={getSelectFilterOption}
                  options={statusList}
                  data-testid={TEST_ID.FILTERS.SELECT_ORDER_STATUS}
                />
              </Col>
              <Col md={7} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.FILTERS.INPUT_ORDER_STATUS_MORE_THAN}>{t('global:DURATION')}</label>&nbsp;
                <Tooltip title={t('DURATION_INFO')}>
                  <InfoCircleOutlined />
                </Tooltip>
                <Input
                  value={orderStatusMoreThan}
                  type="number"
                  min="0"
                  placeholder={t('MORE_THAN_X_MINUTES')}
                  onChange={handleMoreThanChange}
                  disabled={isEmpty(orderStatus)}
                  className={classes.fullWidth}
                  id={TEST_ID.FILTERS.INPUT_ORDER_STATUS_MORE_THAN}
                  data-testid={TEST_ID.FILTERS.INPUT_ORDER_STATUS_MORE_THAN}
                />
              </Col>
            </Row>
            <Row gutter={8} justify="end" className={classes.customRow}>
              <Button
                type="primary"
                disabled={!isBringEnabled}
                onClick={handleBringClick}
                data-testid={TEST_ID.ACTIONS.APPLY_FILTERS}
              >
                {t('global:APPLY')}
              </Button>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;

import { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spin, Select } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import {
  availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector,
  getCitiesSelector, getFilteredWarehousesSelector,
} from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS, GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { getPermittedIntegrationTypes } from '@app/pages/MarketOrderAnalytics/integrationTypeUtils';
import { usePermission } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES } from '@app/pages/MarketOrderAnalytics/constants';

import { Creators } from '../../redux/actions';
import { clientSearchSelector, getSubmittedFilters } from '../../redux/selectors';
import { getDomainTypeSelectOptions, getSelectOptionsFromListData } from './formHelper';
import useStyles from './styles';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY, SEARCH_CLIENT_CACHE_MIN } from '../../constant';
import { getFilteredAndExcludedIntegrationTypes } from '../../utils';
import { TEST_ID } from '../../testing';

const BasicFilterForm = ({ handleSubmit }) => {
  const { t } = useTranslation('activeOrdersForManagementPage');
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { canAccess } = usePermission();

  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const isWarehousesPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const getAllClients = useSelector(clientSearchSelector.getClients);
  const lastDataFetchDate = useSelector(clientSearchSelector.getLastDataFetchDate);
  const isSearchedClientsPending = useSelector(clientSearchSelector.getIsPending);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const availableIntegrationTypes = useSelector(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);
  const selectedIntegrationTypes = useSelector(getSubmittedFilters).integrationTypes;

  const classes = useStyles();

  const domainTypeSelectOptionsData = getDomainTypeSelectOptions(availableDomainTypes);

  const values = useSelector(getSubmittedFilters);

  const citySelectOptionsData = useMemo(() => {
    return getSelectOptionsFromListData(cities, { labelKey: `name.${getLangKey()}` });
  }, [cities]);

  const warehouseSelectOptionsData = useMemo(() => {
    return getSelectOptionsFromListData(warehouses);
  }, [warehouses]);

  const isWarehouseSelectDisabled = !values.city || isWarehousesPending;
  const isCitySelectDisabled = isCitiesPending;

  const handleSelectInputChange = (fieldName, value) => {
    const newValues = { ...values, [fieldName]: value };
    if (
      fieldName === 'city' ||
      fieldName === 'domainType'
    ) {
      const city = get(newValues, 'city', false);
      const domainType = get(newValues, 'domainType', false);

      const warehouseRequestParams = {
        ...(city && { cities: [city] }),
        ...(domainType && { domainTypes: [domainType] }),
        fields: '_id name domainTypes',
      };

      dispatch(CommonCreators.getFilteredWarehousesRequest(warehouseRequestParams));
      dispatch(Creators.submitFilters({
        filters: {
          warehouse: null,
          clientId: null,
        },
      }));
    }

    if (fieldName === 'domainType') {
      dispatch(Creators.submitFilters({ filters: { city: null } }));
      dispatch(CommonCreators.setSelectedDomainType({ data: value }));
    }
    dispatch(Creators.submitFilters({ filters: { [fieldName]: value } }));
    handleSubmit();
  };

  const handleClientSearch = useCallback(value => {
    setSearchTerm(value);
  }, []);
  const { debouncedCallback: handleDebouncedClientSearch } = useDebouncedCallback({ callback: handleClientSearch, delay: DEFAULT_DEBOUNCE_MS });

  const clientSelectOptionsData = useMemo(() => {
    if (searchTerm.length >= 3) {
      const searchedClients = getAllClients.filter(
        client => client?.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          client?.gsmWithoutCountryCode.includes(searchTerm) || client?.email.includes(searchTerm),
      );
      return getSelectOptionsFromListData(searchedClients);
    }
    return getSelectOptionsFromListData(getAllClients?.slice(0, 20) || []);
  }, [getAllClients, searchTerm]);

  const orderStatusOptions = Object.entries(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES)
    .map(([key, val]) => {
      return {
        value: val,
        label: t(`global:MARKET_ORDER_STATUSES.${key}`),
      };
    });

  const handleDropdownVisibleChange = isVisible => {
    const lastFetchDiffInMin = moment.duration(moment().diff(lastDataFetchDate)).minutes();

    if (isVisible && lastFetchDiffInMin >= SEARCH_CLIENT_CACHE_MIN) {
      dispatch(Creators.clientSearchRequest());
    }
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
  const shouldDisableIntegrationTypeFilter = getFilteredAndExcludedIntegrationTypes({ canAccess, permittedIntegrationTypes }).isForced;

  const integrationTypeOptions = useMemo(
    () => permittedIntegrationTypes.map(tag => {
      return { value: tag, label: tag };
    }),
    [permittedIntegrationTypes],
  );

  const slottedStateOptions = [
    {
      value: true,
      label: t('SLOTTED'),
    },
    {
      value: false,
      label: t('ON_DEMAND'),
    },
  ];

  return (
    <Row gutter={[4, 4]}>
      <Col xs={12} sm={3}>
        <Select
          placeholder={t('global:DOMAIN_TYPE')}
          value={values.domainType}
          onChange={value => handleSelectInputChange('domainType', value)}
          options={domainTypeSelectOptionsData}
          className={classes.selectInput}
          data-testid={TEST_ID.DOMAIN_TYPE_SELECT}
        />
      </Col>
      {
        shouldShowIntegrationTypeFilter && (
        <Col xs={12} sm={3} className={classes.fullWidth}>
          <Select
            mode="multiple"
            options={integrationTypeOptions}
            placeholder={t('global:INTEGRATION_TYPE')}
            filterOption={getSelectFilterOption}
            value={selectedIntegrationTypes}
            onChange={value => handleSelectInputChange('integrationTypes', value)}
            className={classes.selectInput}
            showSearch
            allowClear
            disabled={shouldDisableIntegrationTypeFilter}
            data-testid={TEST_ID.INTEGRATION_TYPE_SELECT}
          />
        </Col>
        )
      }
      <Col xs={12} sm={3}>
        <Select
          placeholder={t('global:DELIVERY_TYPE')}
          value={values.isSlottedDelivery}
          onChange={value => handleSelectInputChange('isSlottedDelivery', value)}
          options={slottedStateOptions}
          allowClear
          className={classes.selectInput}
          data-testid={TEST_ID.DELIVERY_TYPE_SELECT}
        />
      </Col>
      <Col xs={12} sm={3}>
        <Select
          placeholder={t('global:CITY')}
          value={values.city}
          onChange={value => handleSelectInputChange('city', value)}
          options={citySelectOptionsData}
          filterOption={getSelectFilterOption}
          allowClear
          className={classes.selectInput}
          loading={isCitiesPending}
          disabled={isCitySelectDisabled}
          showSearch
          data-testid={TEST_ID.CITY_SELECT}
        />
      </Col>
      <Col xs={12} sm={4}>
        <Select
          placeholder={t('global:WAREHOUSE')}
          value={values.warehouse}
          onChange={value => handleSelectInputChange('warehouse', value)}
          options={warehouseSelectOptionsData}
          notFoundContent={isWarehousesPending ? <Spin size="small" /> : null}
          filterOption={getSelectFilterOption}
          allowClear
          showSearch
          className={classes.selectInput}
          loading={isWarehousesPending}
          disabled={isWarehouseSelectDisabled}
          data-testid={TEST_ID.WAREHOUSE_SELECT}
        />
      </Col>
      <Col xs={12} sm={4}>
        <Select
          placeholder={t('CLIENT')}
          value={values.clientId}
          onChange={value => handleSelectInputChange('clientId', value)}
          notFoundContent={isSearchedClientsPending ? <Spin size="small" /> : null}
          onSearch={handleDebouncedClientSearch}
          options={clientSelectOptionsData}
          loading={isSearchedClientsPending}
          filterOption={() => true}
          className={classes.selectInput}
          allowClear
          showSearch
          onDropdownVisibleChange={handleDropdownVisibleChange}
          data-testid={TEST_ID.CLIENT_SELECT}
        />
      </Col>
      <Col xs={12} sm={4}>
        <Select
          placeholder={t('global:ORDER_STATUS_TEXT')}
          value={values.orderStatus}
          mode="multiple"
          maxTagCount="responsive"
          className={classes.selectInput}
          onChange={value => handleSelectInputChange('orderStatus', value)}
          options={orderStatusOptions}
          filterOption={getSelectFilterOption}
          allowClear
          data-testid={TEST_ID.ORDER_STATUS_SELECT}
        />
      </Col>
    </Row>
  );
};

export default BasicFilterForm;

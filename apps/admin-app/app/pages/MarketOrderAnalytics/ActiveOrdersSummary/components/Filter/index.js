import { useMemo, useState } from 'react';
import { Collapse, Select, Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { usePermission } from '@shared/hooks';
import { getLangKey } from '@shared/i18n';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector, getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getPermittedIntegrationTypes } from '@app/pages/MarketOrderAnalytics/integrationTypeUtils';
import { getSelectFilterOption } from '@shared/utils/common';
import ProductsListActionButton from '@shared/containers/ProductsListModal/ActionButton';
import { filtersSelector, getChartFilters, getFilteredWarehouses } from '../../redux/selectors';
import { FILTER_FIELD_NAMES } from '../../redux/reducer';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { DELIVERY_TYPES, INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from '../../constants';
import { getFilteredAndExcludedIntegrationTypes } from '../../utils';
import { TEST_ID } from '@app/pages/MarketOrderAnalytics/ActiveOrdersSummary/testing';

const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const TagOption = (value, text) => {
  return (
    <Option value={value} key={value}>
      <Text>{text}</Text>
    </Option>
  );
};

const Filter = () => {
  const { t } = useTranslation('activeOrdersForExecutiveDashboardPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const { canAccess } = usePermission();

  const selectedDomainType = useSelector(filtersSelector.getDomainType);

  const selectedCity = useSelector(filtersSelector.getCity);
  const selectedWarehouses = useSelector(filtersSelector.getWarehouses);
  const selectedIntegrationTypes = useSelector(filtersSelector.getIntegrationTypes);
  const selectedDeliveryType = useSelector(filtersSelector.getIsSlottedDelivery);
  const warehousesForSelect = useSelector(getFilteredWarehouses);

  const filters = useSelector(filtersSelector.getAll);
  const chartFilters = useSelector(getChartFilters);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const availableIntegrationTypes = useSelector(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);

  function refreshStats() {
    dispatch(Creators.getActiveOrdersExecutiveStatsRequest());
  }

  function refreshWarehouses({
    domainType,
    city,
  }) {
    dispatch(
      CommonCreators.getFilteredWarehousesRequest({
        domainTypes: domainType ? [domainType] : undefined,
        cities: city ? [city] : undefined,
        fields: '_id name city',
      }),
    );
  }

  const [activeKey, setActiveKey] = useState(['execDashboard']);

  const handleDomainTypeChange = selectDomainType => {
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.domainType, value: selectDomainType }));
    dispatch(CommonCreators.setSelectedDomainType({ data: selectDomainType || null }));
    refreshStats();
    refreshWarehouses({ domainType: selectDomainType, city: selectedCity });
  };

  const handleCityChange = selectCity => {
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.city, value: selectCity }));
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.warehouses, value: [] }));
    refreshStats();
    refreshWarehouses({ domainType: selectedDomainType, city: selectCity });
  };

  const handleWarehouseChange = selectWarehouses => {
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.warehouses, value: selectWarehouses }));
    refreshStats();
  };

  const handleIntegrationTypeChange = selectIntegrationType => {
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.integrationTypes, value: selectIntegrationType }));
    refreshStats();
  };

  const handleCityClear = () => {
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.warehouses, value: [] }));
    refreshStats();
  };

  const handleDeliveryTypeChange = selectDeliveryType => {
    dispatch(Creators.setFilter({ filterName: FILTER_FIELD_NAMES.isSlottedDelivery, value: selectDeliveryType }));
    refreshStats();
  };

  const domainTypeList = availableDomainTypes.map(tag => {
    const tagText = t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`);
    return TagOption(tag, tagText);
  });

  const cityOptions = useMemo(
    () => cities.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    }),
    [cities],
  );

  const warehouseOptions = useMemo(
    () => warehousesForSelect.map(tag => {
      return { value: tag._id, label: tag.name, city: tag.city };
    }),
    [warehousesForSelect],
  );

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

  const deliveryTypeOptions = Object.keys(DELIVERY_TYPES).map(key => ({ value: DELIVERY_TYPES[key], label: t(`DELIVERY_TYPES.${key}`) }));

  return (
    <Row>
      <Col span={24}>
        <Collapse
          activeKey={activeKey}
          onChange={key => {
            setActiveKey(key);
          }}
        >
          <Panel
            header={t('global:FILTER')}
            key="execDashboard"
            on
          >
            <Row gutter={[8, 8]} style={{ display: 'flex', alignItems: 'center' }}>
              <Col md={5} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.DOMAIN_TYPE_SELECT}>{t('global:DOMAIN_TYPE')}</label>
                <Select
                  value={selectedDomainType}
                  placeholder={t('global:DOMAIN_TYPE')}
                  onChange={handleDomainTypeChange}
                  className={classes.fullWidth}
                  allowClear
                  id={TEST_ID.DOMAIN_TYPE_SELECT}
                >
                  {domainTypeList}
                </Select>
              </Col>
              {
                shouldShowIntegrationTypeFilter && (
                  <Col md={5} className={classes.fullWidth}>
                    <label htmlFor={TEST_ID.INTEGRATION_TYPE_SELECT}>{t('global:INTEGRATION_TYPE')}</label>
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
                      id={TEST_ID.INTEGRATION_TYPE_SELECT}
                    />
                  </Col>
                )
              }
              <Col md={4} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.DELIVERY_TYPE_SELECT}>{t('global:DELIVERY_TYPE')}</label>
                <Select
                  value={selectedDeliveryType}
                  options={deliveryTypeOptions}
                  placeholder={t('global:DELIVERY_TYPE')}
                  id={TEST_ID.DELIVERY_TYPE_SELECT}
                  className={classes.fullWidth}
                  onChange={handleDeliveryTypeChange}
                  allowClear
                />
              </Col>
              <Col md={5} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.CITY_SELECT}>{t('global:CITY')}</label>
                <Select
                  value={selectedCity}
                  options={cityOptions}
                  placeholder={t('global:CITY')}
                  onChange={handleCityChange}
                  onClear={handleCityClear}
                  className={classes.fullWidth}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  showSearch
                  allowClear
                  id={TEST_ID.CITY_SELECT}
                />
              </Col>
              <Col md={5} className={classes.fullWidth}>
                <label htmlFor={TEST_ID.WAREHOUSE_SELECT}>{t('global:WAREHOUSE')}</label>
                <Select
                  value={selectedWarehouses}
                  mode="multiple"
                  options={warehouseOptions}
                  placeholder={t('global:WAREHOUSE')}
                  onChange={handleWarehouseChange}
                  className={classes.fullWidth}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  disabled={!selectedCity}
                  showArrow
                  showSearch
                  allowClear
                  id={TEST_ID.WAREHOUSE_SELECT}
                />
              </Col>
              <ProductsListActionButton
                filters={{ ...filters, ...chartFilters }}
                className={classes.productsListActionButtonContainer}
                data-testid={TEST_ID.PRODUCT_LIST_ACTION_BUTTON}
              />
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;

import { Button, Col, Collapse, Row, Select, Spin, Typography } from 'antd';
import {
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector,
  getCitiesSelector, getFilteredWarehousesSelector,
} from '@shared/redux/selectors/common';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { paymentMethods } from '@shared/shared/constantValues';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { usePermission } from '@shared/hooks';
import { getPermittedIntegrationTypes } from '@app/pages/MarketOrderAnalytics/integrationTypeUtils';
import { getSelectFilterOption } from '@shared/utils/common';

import { Creators } from '../../redux/actions';
import { CITY_DEPENDENCY, INTEGRATION_TYPE_TO_ACCESS_KEY, ORDER_STATUS_FOR_GROWTH_PAGE, REST_OF_GETIR_ACCESS_KEY, SLOTTED_STATE } from '../../constants';
import { filtersSelector, activePromoDataSelector } from '../../redux/selectors';
import useStyles from './styles';
import { getFilteredAndExcludedIntegrationTypes } from '../../utils';
import { TEST_ID } from '../../testing';

const { Text } = Typography;
const { Panel } = Collapse;

export const exampleCsv = { id: 'Object Id' };

const Filter = () => {
  const { t } = useTranslation('activeOrdersForGrowthPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const { canAccess } = usePermission();
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const availableIntegrationTypes = useSelector(availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData);

  const cityIdToCityMap = useMemo(() => {
    return cities.reduce((accum, city) => {
      // eslint-disable-next-line no-param-reassign
      accum[city._id] = city;
      return accum;
    }, {});
  }, [cities]);

  const isWarehousesRequestPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  // all warehouses from selected domainType and city
  const warehousesForSelect = useSelector(getFilteredWarehousesSelector.getData);
  const warehouseIdToWarehouseMap = useMemo(() => {
    return warehousesForSelect.reduce((accum, warehouse) => {
      // eslint-disable-next-line no-param-reassign
      accum[warehouse._id] = warehouse;
      return accum;
    }, {});
  }, [warehousesForSelect]);

  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const selectedCities = useSelector(filtersSelector.getSelectedCities);
  const selectedPromos = useSelector(filtersSelector.getSelectedPromos);
  const selectedPaymentMethods = useSelector(filtersSelector.getSelectedPaymentMethods);
  const selectedIntegrationTypes = useSelector(filtersSelector.getIntegrationTypes);
  const selectedOrderStatuses = useSelector(filtersSelector.getSelectedOrderStatuses);

  const promoData = useSelector(activePromoDataSelector.getData);
  const promoDataIsPending = useSelector(activePromoDataSelector.getIsPending);

  const warehousesDisabled = selectedCities.length !== 1;

  const getFilteredWarehouses = ({
    citiesForWarehouse,
    domainTypeForWarehouse,
  }) => {
    dispatch(
      CommonCreators.getFilteredWarehousesRequest({
        cities: citiesForWarehouse,
        domainTypes: [domainTypeForWarehouse],
        fields: '_id name',
      }),
    );
  };

  const selectedWarehouses = useSelector(filtersSelector.getSelectedWarehouses);
  const pagination = useSelector(filtersSelector.getPagination);

  const [activeKey, setActiveKey] = useState(['1']);
  const [cityDependency, setCityDependency] = useState(CITY_DEPENDENCY.DEPENDENT);

  const handlePromoChange = promos => {
    dispatch(Creators.setSelectedPromos({ promos }));
  };

  const handleWarehouseChange = warehouses => {
    dispatch(Creators.setSelectedWarehouses({ warehouses }));
    handlePromoChange([]);
    dispatch(Creators.getPromoRequest());
  };

  const handleDomainTypeChange = domainType => {
    dispatch(Creators.setSelectedDomainType({ domainType }));
    handlePromoChange([]);
    dispatch(Creators.getPromoRequest());

    if (!warehousesDisabled) {
      getFilteredWarehouses({
        citiesForWarehouse: selectedCities,
        domainTypeForWarehouse: domainType,
      });
    }
  };

  const handleCitiesChange = selectedCitiesInput => {
    dispatch(Creators.setSelectedCities({ cities: selectedCitiesInput }));
    // reset warehouses
    dispatch(Creators.setSelectedWarehouses({ warehouses: [] }));
    handlePromoChange([]);
    dispatch(Creators.getPromoRequest());

    const warehousesDisabledNew = selectedCitiesInput.length !== 1;

    if (!warehousesDisabledNew) {
      getFilteredWarehouses({
        citiesForWarehouse: selectedCitiesInput,
        domainTypeForWarehouse: selectedDomainType,
      });
    }
  };

  const handleCityDependencyChange = dependency => {
    setCityDependency(dependency);
    dispatch(Creators.setSelectedWarehouses({ warehouses: [] }));
    dispatch(Creators.setSelectedCities({ cities: [] }));
  };

  const handlePaymentMethodsChange = selectedPaymentMethod => {
    dispatch(Creators.setSelectedPaymentMethods({ paymentMethods: selectedPaymentMethod }));
  };

  const handleBringClick = () => {
    dispatch(Creators.setPagination({
      currentPage: 1,
      rowsPerPage: pagination.rowsPerPage,
    }));
    dispatch(Creators.getActiveOrdersForGrowthRequest());
    setActiveKey([]);
  };

  const handleSlottedStateTypeChange = slottedState => {
    dispatch(Creators.setSlottedState({ slottedState }));
  };

  const handleOrderStatusChange = orderStatuses => {
    dispatch(Creators.setOrderStatuses({ orderStatuses }));
  };

  const domainTypeOptions = availableDomainTypes.map(tag => {
    return {
      value: tag,
      label: t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`),
    };
  });

  const cityDependencyTypeOptions = [
    {
      value: CITY_DEPENDENCY.DEPENDENT,
      label: t('CITY_DEPENDENT'),
    },
    {
      value: CITY_DEPENDENCY.INDEPENDENT,
      label: t('CITY_INDEPENDENT'),
    },
  ];

  const slottedStateOptions = [
    {
      value: SLOTTED_STATE.SCHEDULED,
      label: t('activeOrdersForGrowthPage:SLOTTED_STATES.SCHEDULED'),
    },
    {
      value: SLOTTED_STATE.ON_DEMAND,
      label: t('activeOrdersForGrowthPage:SLOTTED_STATES.ON_DEMAND'),
    },
  ];

  const orderStatusOptions = Object.entries(ORDER_STATUS_FOR_GROWTH_PAGE)
    .map(([key, val]) => {
      return {
        value: val,
        label: t(`global:MARKET_ORDER_STATUSES.${key}`),
      };
    });

  const cityOptions = useMemo(() => {
    return cities.map(city => {
      return {
        value: city._id,
        label: city.name[getLangKey()],
      };
    });
  }, [cities]);

  const promoOptions = useMemo(() => {
    return promoData.map(promo => {
      return {
        value: promo._id,
        label: promo.promoCode,
      };
    });
  }, [promoData]);

  const warehouseOptions = useMemo(() => {
    return warehousesForSelect.map(tag => {
      return {
        value: tag._id,
        label: tag.name,
      };
    });
  }, [warehousesForSelect]);

  const csvWarehouseOptions = useMemo(() => {
    return selectedWarehouses.map(tag => {
      return {
        value: tag,
        label: tag,
      };
    });
  }, [selectedWarehouses]);

  const paymentMethodOptions = useMemo(() => {
    return Object.entries(paymentMethods)
      .filter(([key]) => {
        // only numbered keys allowed
        const numKey = parseInt(key, 10);
        return !Number.isNaN(numKey);
      })
      .map(([key, name]) => {
        return {
          value: parseInt(key, 10),
          label: name[getLangKey()],
        };
      });
  }, []);

  const getIdsFromCsvData = data => {
    if (isEmpty(data) || !Array.isArray(data)) {
      dispatch(ToastCreators.error({ message: t('error:CSV_ERROR') }));
      return [];
    }
    const ids = data.filter(c => c?.id)
      .map(c => c.id);
    if (isEmpty(ids)) {
      dispatch(ToastCreators.error({ message: t('error:INVALID_CSV') }));
      return [];
    }
    return ids;
  };

  const handleCityCsvImport = ({ data }) => {
    const ids = getIdsFromCsvData(data);
    if (ids) {
      const invalidsRemoved = ids.filter(id => cityIdToCityMap[id]);
      handleCitiesChange(invalidsRemoved);
    }
  };

  const handleIntegrationTypeChange = selectIntegrationType => {
    dispatch(Creators.setIntegrationTypes({ integrationTypes: selectIntegrationType }));
    handlePromoChange([]);
    dispatch(Creators.getPromoRequest());
  };

  const handleWarehouseCsvImport = ({ data }) => {
    const ids = getIdsFromCsvData(data);
    if (ids && cityDependency !== CITY_DEPENDENCY.INDEPENDENT) {
      const invalidsRemoved = ids.filter(id => warehouseIdToWarehouseMap[id]);
      return handleWarehouseChange(invalidsRemoved);
    }

    return handleWarehouseChange(ids);
  };

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
      <label className="w-100" htmlFor="domain-type-select">
        <Text>{t('global:DOMAIN_TYPE')}</Text>
      </label>
      <Select
        value={selectedDomainType}
        options={domainTypeOptions}
        placeholder={t('global:DOMAIN_TYPE')}
        onChange={handleDomainTypeChange}
        className={classes.fullWidth}
        filterOption={getSelectFilterOption}
        id="domain-type-select"
        showSearch
      />
    </>
  );
  const integrationTypeSelect = (
    <>
      <label className="w-100" htmlFor="integration-type-select">
        <Text>{t('global:INTEGRATION_TYPE')}</Text>
      </label>
      <Select
        mode="multiple"
        maxTagCount="responsive"
        options={integrationTypeOptions}
        placeholder={t('global:INTEGRATION_TYPE')}
        filterOption={getSelectFilterOption}
        value={selectedIntegrationTypes}
        onChange={handleIntegrationTypeChange}
        className={classes.fullWidth}
        disabled={shouldDisableIntegrationTypeFilter}
        id="integration-type-select"
        showSearch
        allowClear
      />
    </>
  );

  const cityDependencyTypeSelect = (
    <>
      <label className="w-100" htmlFor="city-dependency-type-select">
        <Text>{t('CITY_DEPENDENCY')}</Text>
      </label>
      <Select
        options={cityDependencyTypeOptions}
        value={cityDependency}
        className={classes.fullWidth}
        onChange={handleCityDependencyChange}
        filterOption={getSelectFilterOption}
        id="city-dependency-type-select"
        showSearch
      />
    </>
  );

  const slottedStateSelect = (
    <>
      <label className="w-100" htmlFor="slotted-state-select">
        <Text>{t('activeOrdersForGrowthPage:SLOTTED_STATE_LABEL')}</Text>
      </label>
      <Select
        id="slotted-state-select"
        placeholder={t('activeOrdersForGrowthPage:SLOTTED_STATE_LABEL')}
        onChange={handleSlottedStateTypeChange}
        className={classes.fullWidth}
        allowClear
        options={slottedStateOptions}
        optionFilterProp="label"
      />
    </>
  );

  const citySelect = (
    <>
      <label className="w-100" htmlFor="city-select">
        <Text>
          <span className={classes.textWithCsv}>
            {t('global:CITIES')}
            <span className={classes.csvInput}>
              <CsvImporter onOkayClick={handleCityCsvImport} exampleCsv={exampleCsv} />
            </span>
          </span>
        </Text>
      </label>
      <Select
        value={selectedCities}
        mode="multiple"
        maxTagCount="responsive"
        options={cityOptions}
        placeholder={t('global:CITIES')}
        onChange={handleCitiesChange}
        className={classes.fullWidth}
        optionFilterProp="label"
        filterOption={getSelectFilterOption}
        id="city-select"
        showSearch
        allowClear
      />
    </>
  );

  const cityDependentWarehouseSelect = (
    <>
      <label className="w-100" htmlFor="city-dependent-warehouse-select">
        <Text>
          <span className={classes.textWithCsv}>
            {t('global:WAREHOUSE')}
            <span className={classes.csvInput}>
              <CsvImporter onOkayClick={handleWarehouseCsvImport} exampleCsv={exampleCsv} disabled={warehousesDisabled} />
            </span>
          </span>
        </Text>
      </label>
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
        disabled={warehousesDisabled}
        maxTagCount={4}
        id="city-dependent-warehouse-select"
      />
    </>
  );

  const cityIndependentWarehouseSelect = (
    <>
      <label className="w-100" htmlFor="city-independent-warehouse-select">
        <Text>
          <span className={classes.textWithCsv}>
            {t('global:WAREHOUSE')}
            <span className={classes.csvInput}>
              <CsvImporter onOkayClick={handleWarehouseCsvImport} exampleCsv={exampleCsv} />
            </span>
          </span>
        </Text>
      </label>
      <Select
        value={selectedWarehouses}
        mode="multiple"
        placeholder={t('global:UPLOAD_CSV')}
        onChange={handleWarehouseChange}
        className={classes.fullWidth}
        allowClear
        notFoundContent={isWarehousesRequestPending ? <Spin size="small" /> : undefined}
        options={csvWarehouseOptions}
        optionFilterProp="label"
        filterOption={getSelectFilterOption}
        disabled={!selectedWarehouses.length}
        maxTagCount={2}
        id="city-independent-warehouse-select"
      />
    </>
  );

  const promoSelect = (
    <>
      <label className="w-100" htmlFor="promo-select">
        <Text>{t('global:PROMOS')}</Text>
      </label>
      <Select
        value={selectedPromos}
        mode="multiple"
        maxTagCount="responsive"
        placeholder={t('global:PROMOS')}
        onChange={handlePromoChange}
        className={classes.fullWidth}
        allowClear
        options={promoOptions}
        optionFilterProp="label"
        disabled={promoDataIsPending}
        id="promo-select"
      />
    </>
  );

  const paymentMethodSelect = (
    <>
      <label className="w-100" htmlFor="payment-method-select">
        <Text>{t('global:PAYMENT_METHOD')}</Text>
      </label>
      <Select
        value={selectedPaymentMethods}
        mode="multiple"
        maxTagCount="responsive"
        placeholder={t('global:PAYMENT_METHOD')}
        onChange={handlePaymentMethodsChange}
        className={classes.fullWidth}
        allowClear
        options={paymentMethodOptions}
        optionFilterProp="label"
        id="payment-method-select"
      />
    </>
  );

  const orderStatusSelect = (
    <>
      <label className="w-100" htmlFor="order-status-select">
        <Text>{t('global:STATUS')}</Text>
      </label>
      <Select
        id="order-status-select"
        maxTagCount="responsive"
        mode="multiple"
        value={selectedOrderStatuses}
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
    <Row gutter={[8, 8]} data-testid={TEST_ID.FILTER_WRAPPER}>
      <Col span={24}>
        <Collapse
          activeKey={activeKey}
          onChange={key => {
            setActiveKey(key);
          }}
        >
          <Panel header={t('global:FILTER')} key="1" on>
            <Row gutter={[6, 12]}>
              <Col xs={12} sm={12} md={12} lg={8} xl={2}>{domainTypeSelect}</Col>

              {shouldShowIntegrationTypeFilter && <Col xs={12} sm={12} md={12} lg={8} xl={4}>{integrationTypeSelect}</Col>}

              <Col xs={12} sm={12} md={12} lg={8} xl={3}>{cityDependencyTypeSelect}</Col>

              <Col xs={12} sm={12} md={12} lg={8} xl={3}>{slottedStateSelect}</Col>

              {cityDependency === CITY_DEPENDENCY.DEPENDENT ? (
                <>
                  <Col xs={24} sm={24} lg={8} xl={6}>{citySelect}</Col>
                  <Col xs={24} sm={24} lg={8} xl={6}>{cityDependentWarehouseSelect}</Col>
                </>
              )
                : <Col xs={24} sm={24} lg={8} xl={6}>{cityIndependentWarehouseSelect}</Col>}

              <Col xs={24} sm={24} lg={8} xl={6}>{promoSelect}</Col>

              <Col xs={24} sm={24} lg={8} xl={6}>{paymentMethodSelect}</Col>

              <Col xs={24} sm={24} lg={8} xl={6}>{orderStatusSelect}</Col>
            </Row>
            <Row justify="end">
              <Button className={classes.buttonWrapper} type="primary" disabled={!isBringEnabled} onClick={handleBringClick}>
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

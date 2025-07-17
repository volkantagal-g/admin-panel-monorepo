import { Col, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';

import {
  filtersSelector,
  getOperationStatsForCitiesCityNamesSelector,
  getOperationDataWarehouseNames,
  operationStatsDataForCitiesSelector,
  operationStatsDataForSelectedCitySelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import {
  availableDomainTypesForCountrySelector,
  availableIntegrationTypesForCountrySelector,
} from '@shared/redux/selectors/common';

type RowFirst = {
  name: string;
  id: string;
};

export default function Filter({ selectedCity }: {
  selectedCity: string | null;
}) {
  const { domainType } = useSelector(filtersSelector);
  const { integrationType } = useSelector(filtersSelector);
  const { mainColumnSearchText } = useSelector(filtersSelector);
  const operationStatsLoading = useSelector(operationStatsDataForCitiesSelector.isPending);
  const dashboardDataLoading = useSelector(operationStatsDataForSelectedCitySelector.isPending);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state));
  const availableIntegrationTypes = useSelector(
    availableIntegrationTypesForCountrySelector.getCurrentCountrySpecificData,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const refetchData = (filters: any) => {
    if (selectedCity) {
      dispatch(
        Creators.getLiveMapDataBySelectedCityRequest({ data: { ...filters, selectedCity } }),
      );
    }
    else {
      dispatch(Creators.getOperationStatsRequest({ data: filters }));
    }
  };

  const handleIntegrationTypeChange = (i: string) => {
    const filters = { integrationType: i || null };
    dispatch(Creators.setFilters({ filters }));
    refetchData({ ...filters, domainType });
  };
  const handleDomainTypeChange = (d: number) => {
    const filters = { domainType: d || null, integrationType: null };
    dispatch(Creators.setFilters({ filters }));
    refetchData({ ...filters });
  };

  const handleMainColumnSearch = (searchText: string) => {
    const namePart = (searchText || '').split('__')[0] || null;
    const filters = { mainColumnSearchText: namePart };
    dispatch(Creators.setFilters({ filters }));
  };

  const domainTypeOptions = availableDomainTypes.map(
    (domainTypeVal: number) => ({
      value: domainTypeVal,
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainTypeVal}`),
    }),
  );

  const integrationTypeOptions = [
    {
      value: 'getir',
      label: 'getir',
    },
    ...availableIntegrationTypes.map((integrationTypeVal: number) => ({
      value: integrationTypeVal,
      label: t(`THIRD_PARTY_ORDER_INTEGRATION_TYPES.${integrationTypeVal}`),
    })),
  ];

  // these values are from fetched data
  const cities = useSelector(getOperationStatsForCitiesCityNamesSelector);
  const warehouses = useSelector(getOperationDataWarehouseNames);

  const cityOptions = (cities || []).map((city: RowFirst) => ({
    // adding id so that same named cities do not cause react-key problem
    value: `${city.name}__${city.id}`,
    label: city.name,
  }));

  const warehouseOptions = (warehouses || []).map((warehouse: RowFirst) => ({
    value: `${warehouse.name}__${warehouse.id}`,
    label: warehouse.name,
  }));

  return (
    <div>
      <Row className={classes.customRow} gutter={[2, 2]}>
        {selectedCity ? (
          <Col md={6} xs={24}>
            <label htmlFor="warehouse" className={classes.label}>
              {t('global:WAREHOUSE')}
            </label>
            <Select
              value={mainColumnSearchText}
              options={warehouseOptions}
              placeholder={t('global:WAREHOUSE')}
              onChange={handleMainColumnSearch}
              optionFilterProp="label"
              filterOption={getSelectFilterOption}
              id="warehouse"
              loading={dashboardDataLoading}
              disabled={dashboardDataLoading}
              showSearch
              allowClear
              className={classes.fullWidth}
            />
          </Col>
        ) : (
          <Col md={6} xs={24}>
            <label htmlFor="city" className={classes.label}>
              {t('global:CITY')}
            </label>
            <Select
              value={mainColumnSearchText}
              options={cityOptions}
              placeholder={t('global:CITY')}
              onChange={handleMainColumnSearch}
              filterOption={getSelectFilterOption}
              optionFilterProp="label"
              id="city"
              loading={operationStatsLoading}
              disabled={operationStatsLoading}
              showSearch
              allowClear
              className={classes.fullWidth}
            />
          </Col>
        )}
        <Col md={6} xs={24}>
          <label htmlFor="domain_type" className={classes.label}>
            {t('global:DOMAIN_TYPE')}
          </label>
          <Select
            value={domainType}
            options={domainTypeOptions}
            placeholder={t('global:DOMAIN_TYPE')}
            onChange={handleDomainTypeChange}
            optionFilterProp="label"
            id="domain_type"
            className={classes.fullWidth}
            allowClear
          />
        </Col>
        <Col md={6} xs={24}>
          <label htmlFor="integration_type" className={classes.label}>
            {t('global:INTEGRATION_TYPE')}
          </label>
          <Select
            value={integrationType}
            options={integrationTypeOptions}
            placeholder={t('global:INTEGRATION_TYPE')}
            onChange={handleIntegrationTypeChange}
            optionFilterProp="label"
            id="integration_type"
            className={classes.fullWidth}
            allowClear
            disabled={!domainType}
          />
        </Col>
      </Row>
    </div>
  );
}

import { Col, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { VEHICLE_TYPE } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';

import { filtersSelector, getOperationDataWarehouseNames } from '../../redux/selectors';
import { availableDomainTypesForCountrySelector, getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { TEST_ID } from '@app/pages/LiveMonitoring/CourierLiveMonitoring/constants';

type RowFirst = {
  name: string;
  id: string;
}

export default function Filter({ url } : { url: string | null}) {
  const lang = getLangKey();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const availableDomainTypes = useSelector(availableDomainTypesForCountrySelector.getDomainTypes);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const filters = useSelector(filtersSelector);
  const warehouseNames = useSelector(getOperationDataWarehouseNames);

  const handleDomainTypeChange = (domainType: number) => {
    dispatch(Creators.setFilters({ filters: { ...filters, domainType: (domainType || null) } }));
  };

  const handleWarehouseChange = (warehouse: string) => {
    dispatch(Creators.setFilters({ filters: { ...filters, selectedWarehouse: (warehouse || null) } }));
  };

  const handleVehicleTypeChange = (vehicleType: string) => {
    dispatch(Creators.setFilters({ filters: { ...filters, selectedVehicleType: (vehicleType || null) } }));
  };

  const handleSelectedCity = (city: string) => {
    navigate(`${url}?selectedCity=${city}`);
    dispatch(Creators.getCourierStatusCountsRequest({ data: { selectedCity: city } }));
    dispatch(Creators.setFilters({ filters: { selectedCity: city, selectedWarehouse: null, selectedVehicleType: null, domainType: null } }));
  };

  const domainTypeOptions = useMemo(
    () => {
      return availableDomainTypes.map((_domainType: any) => {
        return {
          value: _domainType,
          label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${_domainType}`),
        };
      });
    },
    [t, availableDomainTypes],
  );

  const vehicleTypesOptions = useMemo(
    () => {
      const types = Object.values(VEHICLE_TYPE).map(val => {
        return {
          value: val,
          label: t(`MARKET_VEHICLE_TYPES.${val}`),
        };
      });
      return types;
    },
    [t],
  );

  const cityOptions = useMemo(
    () => {
      return (cities || []).map((city : RowFirst) => {
        return {
          value: city?.id,
          label: city?.name[lang as keyof typeof city.name],
        };
      });
    },
    [cities, lang],
  );

  return (
    <div>
      <Row
        className={classes.customRow}
        gutter={[2, 2]}
        data-testid={TEST_ID.FILTER_WRAPPER}
      >
        <Col md={6} xs={24}>
          <label htmlFor="city" className={classes.label}>{t('global:CITY')}</label>
          <Select
            value={filters?.selectedCity}
            options={cityOptions}
            placeholder={t('global:CITY')}
            onChange={handleSelectedCity}
            filterOption={getSelectFilterOption}
            optionFilterProp="label"
            id="city"
            showSearch
            allowClear
            className={classes.fullWidth}
          />
        </Col>
        <Col md={6} xs={24}>
          <label htmlFor="warehouse" className={classes.label}>{t('global:WAREHOUSE')}</label>
          <Select
            value={filters?.selectedWarehouse}
            options={warehouseNames}
            placeholder={t('global:WAREHOUSE')}
            onChange={handleWarehouseChange}
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
            id="warehouse"
            disabled={!filters?.selectedCity}
            showSearch
            allowClear
            className={classes.fullWidth}
          />
        </Col>
        <Col md={6} xs={24}>
          <label htmlFor="domainType" className={classes.label}>{t('global:DOMAIN_TYPE')}</label>
          <Select
            value={filters?.domainType}
            options={domainTypeOptions}
            placeholder={t('global:DOMAIN_TYPE')}
            onChange={handleDomainTypeChange}
            optionFilterProp="label"
            id="domainType"
            className={classes.fullWidth}
            allowClear
            // disabled={!filters?.selectedCity}
          />
        </Col>
        <Col md={6} xs={24}>
          <label htmlFor="vehicle_type" className={classes.label}>{t('global:VEHICLE')}</label>
          <Select
            value={filters?.selectedVehicleType}
            options={vehicleTypesOptions}
            placeholder={t('global:VEHICLE')}
            onChange={handleVehicleTypeChange}
            optionFilterProp="label"
            id="vehicle_type"
            className={classes.fullWidth}
            allowClear
          />
        </Col>
      </Row>
    </div>
  );
}

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { getSelectFilterOption } from '@shared/utils/common';
import { availableDomainTypesForCountrySelector, getFilteredWarehousesForDivisionSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';

import useStyles from './styles';

function WarehouseSelect() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const warehouses = useSelector(getFilteredWarehousesForDivisionSelector.getData);
  const isWarehousesPending = useSelector(getFilteredWarehousesForDivisionSelector.getIsPending);
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const domainTypes = useSelector(filtersSelector.getDomainTypes);

  const warehouseSelectOptions = useMemo(() => {
    return warehouses.map(warehouse => ({ value: warehouse._id, label: warehouse.name }));
  }, [warehouses]);
  const filters = useSelector(filtersSelector.getFilters);

  useEffect(() => {
    if (!isAvailableDomainTypesPending) {
      dispatch(CommonCreators.getFilteredWarehousesForDivisionRequest({
        cities: filters?.city ? [filters.city] : undefined,
        domainTypes: [domainTypes],
        fields: 'city _id name',
      }));
    }
  }, [dispatch, filters?.city, domainTypes, isAvailableDomainTypesPending]);

  return (
    <Select
      className={classes.warehouseSelectInput}
      value={filters?.warehouse}
      options={warehouseSelectOptions}
      placeholder={t('global:WAREHOUSE')}
      onChange={handleOnWarehouseSelectChange}
      loading={isWarehousesPending}
      disabled={isWarehousesPending || !filters?.city}
      allowClear
      filterOption={getSelectFilterOption}
      showSearch
    />
  );

  function handleOnWarehouseSelectChange(warehouse) {
    dispatch(Creators.setFilters({ params: { warehouse } }));
  }
}

export default WarehouseSelect;

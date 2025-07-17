import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Checkbox, Select } from 'antd';
import { isEqual } from 'lodash';

import { t } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators } from './redux/actions';
import { getWarehousesSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const reduxKey = REDUX_KEY.SELECT.WAREHOUSES;

const SelectWarehouses = ({
  value,
  onChange,
  isDisabled,
  isMultiple,
  allowClear = true,
  dataTestId,
  defaultValue,
  showArrow = true,
  placeholder,
  className,
  cityIds,
  franchiseIds,
  franchiseAreasIds,
  domainTypes,
  warehouseTypes,
  states,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isPending = useSelector(getWarehousesSelector.getIsPending);
  const [selected, setSelected] = useState(value);
  const refSelected = useRef(selected);
  const prevFranchiseIds = useRef(franchiseIds);
  const prevCityIds = useRef(cityIds);
  const prevFranchiseAreasIds = useRef(franchiseAreasIds);
  const prevDomainTypes = useRef(domainTypes);
  const prevWarehouseTypes = useRef(warehouseTypes);
  const prevStates = useRef(states);
  const [warehouseSelectOptions, setWarehouseSelectOptions] = useState([]);

  useEffect(() => {
    if (!isEqual(refSelected.current, value)) {
      setSelected(value);
    }
  }, [value]);
  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getWarehousesRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    if (
      !isEqual(prevFranchiseIds.current, franchiseIds) ||
      !isEqual(prevCityIds.current, cityIds) ||
      !isEqual(prevFranchiseAreasIds.current, franchiseAreasIds) ||
      !isEqual(prevDomainTypes.current, domainTypes) ||
      !isEqual(prevWarehouseTypes.current, warehouseTypes) ||
      !isEqual(prevStates.current, states)
    ) {
      let filteredWarehouses = warehouses;

      if (cityIds && cityIds.length) {
        prevCityIds.current = cityIds;
        filteredWarehouses = filteredWarehouses.filter(warehouse => cityIds.includes(warehouse.city._id));
      }

      if (franchiseIds && franchiseIds.length) {
        prevFranchiseIds.current = franchiseIds;
        filteredWarehouses = filteredWarehouses.filter(warehouse => franchiseIds.includes(warehouse.franchise));
      }

      if (franchiseAreasIds && franchiseAreasIds.length) {
        prevFranchiseAreasIds.current = franchiseAreasIds;
        filteredWarehouses = filteredWarehouses.filter(warehouse => franchiseAreasIds.includes(warehouse.franchiseAreaId));
      }

      if (domainTypes && domainTypes.length) {
        prevDomainTypes.current = domainTypes;
        filteredWarehouses = filteredWarehouses.filter(warehouse => warehouse.domainTypes.some(type => domainTypes.includes(type)));
      }
      if (states && states.length) {
        prevStates.current = states;
        filteredWarehouses = filteredWarehouses.filter(warehouse => {
          return states.includes(warehouse.state);
        });
      }

      if (warehouseTypes && warehouseTypes.length) {
        prevWarehouseTypes.current = warehouseTypes;
        filteredWarehouses = filteredWarehouses.filter(warehouse => warehouseTypes.includes(warehouse.warehouseType));
      }

      const options = convertSelectOptions(filteredWarehouses, { valueKey: '_id', labelKey: 'name', isData: true });
      setWarehouseSelectOptions(options);
      setSelected(undefined);
    }
  }, [warehouses, cityIds, franchiseIds, franchiseAreasIds, domainTypes, warehouseTypes, states]);

  useEffect(() => {
    const options = convertSelectOptions(warehouses, { valueKey: '_id', labelKey: 'name', isData: true });
    setWarehouseSelectOptions(options);
  }, [warehouses]);

  useEffect(() => {
    if (!isEqual(refSelected.current, selected)) {
      refSelected.current = selected;
      let valueObj;
      if (selected) {
        valueObj = isMultiple ?
          warehouseSelectOptions.filter(f => selected.includes(f.value)) :
          warehouseSelectOptions.find(f => f.value === selected);
      }
      onChange(selected, valueObj);
    }
  }, [selected, onChange, warehouseSelectOptions, isMultiple]);

  const handleSelectAll = () => {
    const newSelected = selected?.length === warehouseSelectOptions?.length ? [] : warehouseSelectOptions.map(option => option.value);
    setSelected(newSelected);
    onChange(newSelected);
  };

  const renderDropdownMenu = menu => {
    return (
      <>
        <Checkbox
          disabled={isDisabled || isPending}
          checked={selected?.length === warehouseSelectOptions.length}
          onChange={({ target }) => handleSelectAll(target.checked)}
          className={classes.selectAllCheckbox}
        >
          {t('global:SELECT_ALL')}
        </Checkbox>
        {menu}
      </>
    );
  };

  return (

    <Select
      data-testid={dataTestId}
      loading={isPending}
      // this `key` is required to re-create the component again; as it doesn't update its state of selection provided in `defaultValue`
      key={warehouseSelectOptions?.length}
      value={selected}
      // this `defaultValue` is required to populate pre-selection
      defaultValue={selected || defaultValue}
      options={warehouseSelectOptions}
      onChange={setSelected}
      allowClear={allowClear}
      showSearch
      mode={isMultiple ? 'multiple' : ''}
      filterOption={selectOptionsSearch}
      disabled={isDisabled || isPending}
      placeholder={placeholder || t('global:FILTER')}
      className={`${classes.warehouseSelect} ${className || ''}`}
      showArrow={showArrow}
      {...(isMultiple && { dropdownRender: renderDropdownMenu })}
    />
  );
};

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectWarehouses);

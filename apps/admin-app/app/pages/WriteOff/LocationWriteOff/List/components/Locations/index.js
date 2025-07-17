import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import AntSelect from '@shared/components/UI/AntSelect';
import useStyles from './styles';
import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { locationsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const SelectLocations = ({ warehouses, isDisabled, ...otherProps }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const warehouseLocations = useSelector(locationsSelector.getData);
  const isPending = useSelector(locationsSelector.getIsPending);

  const options = convertSelectOptions(warehouseLocations, { valueKey: '_id', labelKey: 'barcode' });

  const isSingleWarehouse = warehouses.length === 1;

  useEffect(() => {
    if (isSingleWarehouse) {
      dispatch(Creators.getLocationsRequest({ warehouseId: warehouses[0] }));
    }
  }, [dispatch, warehouses, isSingleWarehouse]);

  return (
    <AntSelect
      options={options}
      placeholder={t('global:FILTER')}
      disabled={isPending || isDisabled || !isSingleWarehouse}
      filterOption={getSelectFilterOption}
      showSearch
      className={classes.select}
      {...otherProps}
    />
  );
};

export default SelectLocations;

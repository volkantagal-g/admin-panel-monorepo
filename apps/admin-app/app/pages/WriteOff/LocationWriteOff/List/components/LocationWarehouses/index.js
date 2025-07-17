import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import AntSelect from '@shared/components/UI/AntSelect';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const SelectLocationWarehouses = ({ isDisabled, ...otherProps }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const locationWarehouses = useSelector(getFilteredWarehousesSelector.getData);

  const isPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const options = convertSelectOptions(locationWarehouses, { valueKey: 'id', labelKey: 'name' });
  const classes = useStyles();

  useEffect(() => {
    dispatch(CommonCreators.getFilteredWarehousesRequest());
  }, [dispatch]);

  return (
    <AntSelect
      options={options}
      placeholder={t('global:FILTER')}
      disabled={isPending || isDisabled}
      filterOption={getSelectFilterOption}
      showSearch
      className={classes.select}
      {...otherProps}
    />
  );
};

export default SelectLocationWarehouses;

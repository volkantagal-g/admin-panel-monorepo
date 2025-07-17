import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { first } from 'lodash';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { citiesSelector } from '../../../redux/selectors';

const SelectCity = ({
  isFirstOptionSelected = true,
  allowClear = false,
  onChange,
  isDisabled,
  placeholder = t('global:SELECT.CITY'),
  value,
  ...otherProps
}) => {
  const data = useSelector(citiesSelector.getData);
  const isPending = useSelector(citiesSelector.getIsPending);

  const [citySelectOptions, setCitySelectOptions] = useState([]);
  const [selected, setSelected] = useState();

  const handleValueChange = val => {
    setSelected(val);

    onChange(val || undefined);
  };

  useEffect(() => {
    const options = convertSelectOptions(data, { valueKey: 'id' });
    setCitySelectOptions(options);
  }, [data]);

  useEffect(() => {
    if (isFirstOptionSelected && citySelectOptions.length) {
      handleValueChange(first(setCitySelectOptions));
    }
  }, [isFirstOptionSelected, setCitySelectOptions]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <AntSelect
      value={selected}
      options={citySelectOptions}
      onChange={handleValueChange}
      disabled={isDisabled || isPending}
      placeholder={placeholder}
      filterOption={selectOptionsSearch}
      allowClear
      showSearch
      {...otherProps}
    />
  );
};

export default SelectCity;

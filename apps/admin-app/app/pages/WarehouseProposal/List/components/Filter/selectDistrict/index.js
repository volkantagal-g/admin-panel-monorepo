import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { first } from 'lodash';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import { districtSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

const SelectDistrict = ({
  isFirstOptionSelected = true,
  allowClear = false,
  onChange,
  isDisabled,
  placeholder = t('global:SELECT.DISTRICT'),
  value,
  city,
  ...otherProps
}) => {
  const data = useSelector(districtSelector.getData);
  const isPending = useSelector(districtSelector.getIsPending);
  const dispatch = useDispatch();

  const [districtSelectOptions, setDistrictSelectOptions] = useState([]);
  const [selected, setSelected] = useState();

  const handleValueChange = val => {
    setSelected(val);

    onChange(val || undefined);
  };

  useEffect(() => {
    const options = convertSelectOptions(data, { valueKey: 'id' });
    setDistrictSelectOptions(options);
  }, [data]);

  useEffect(() => {
    if (isFirstOptionSelected && districtSelectOptions.length) {
      handleValueChange(first(setDistrictSelectOptions));
    }
  }, [isFirstOptionSelected, districtSelectOptions]);

  useEffect(() => {
    if (city) {
      dispatch(Creators.getDistrictsRequest({ city }));
    }
    else {
      setDistrictSelectOptions([]);
      handleValueChange(undefined);
    }
  }, [city]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <AntSelect
      value={selected}
      options={districtSelectOptions}
      onChange={handleValueChange}
      disabled={isDisabled || isPending || !city}
      placeholder={placeholder}
      filterOption={selectOptionsSearch}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

export default SelectDistrict;

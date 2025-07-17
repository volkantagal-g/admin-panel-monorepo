import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { first } from 'lodash';

import AntSelect from '@shared/components/UI/AntSelect';
import { selectOptionsSearch } from '@shared/utils/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import useStyles from './styles';

const SelectCountryDialingCode = ({
  isFirstOptionSelected = true,
  isClearable = false,
  onChange,
  isDisabled,
  placeholder = '+',
  value,
  ...otherProps
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const data = useSelector(countriesSelector.getData);
  const isPending = useSelector(countriesSelector.getIsPending);

  const [countryDialingCodeSelectOptions, setCountryDialingCodeSelectOptions] = useState([]);
  const [selected, setSelected] = useState();

  const handleValueChange = useCallback(
    val => {
      setSelected(val);
      onChange(val || undefined);
    },
    [onChange],
  );

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch]);

  useEffect(() => {
    const uniqueDialingCodeMap = new Map();
    data.forEach(({ dialingCode }) => {
      uniqueDialingCodeMap.set(dialingCode, { value: dialingCode, label: dialingCode.toString() });
    });
    setCountryDialingCodeSelectOptions([...uniqueDialingCodeMap.values()]);
  }, [data]);

  useEffect(() => {
    if (isFirstOptionSelected && countryDialingCodeSelectOptions.length) {
      handleValueChange(first(countryDialingCodeSelectOptions));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstOptionSelected, countryDialingCodeSelectOptions]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className={classes.root}>
      <AntSelect
        value={selected}
        options={countryDialingCodeSelectOptions}
        onChange={handleValueChange}
        disabled={isDisabled || isPending}
        allowClear={isClearable}
        placeholder={placeholder}
        filterOption={selectOptionsSearch}
        showSearch
        {...otherProps}
      />
    </div>
  );
};

export default SelectCountryDialingCode;

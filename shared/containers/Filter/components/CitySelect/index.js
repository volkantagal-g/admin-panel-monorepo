import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@shared/containers/Filter/redux/actions';
import { getSelectedCity, getSelectedCities } from '@shared/containers/Filter/redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

import { MAX_TAG_COUNT_ON_SELECT_INPUT } from '@shared/containers/Filter/constants';
import { useValidateState } from '@shared/containers/Filter/hooks/useValidateState';
import useStyles from './styles';

const CitySelect = ({ 
  filterKey, 
  mode, 
  labelInValue,
  isDisabled,
  placeholder,
  maxTagCount,
  showArrow,
  showSearch,
  allowClear,
  onChange,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');
  const classes = useStyles();

  useValidateState({
    filterKey,
    componentName: 'CitySelect',
  });

  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const stateSelector = mode ? getSelectedCities : getSelectedCity;
  const value = useSelector(stateSelector(filterKey));

  const inputPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (mode) return t('CITIES');

    return t('CITY');
  }, [mode, placeholder, t]);

  const isInputDisabled = isDisabled || isCitiesPending;

  const onCityChange = inputValue => {
    if (mode) dispatch(Creators.setSelectedCities({ selectedCities: inputValue, filterKey }));
    else dispatch(Creators.setSelectedCity({ selectedCity: inputValue, filterKey }));

    if (onChange) onChange(inputValue);
  };

  const cityOptions = useMemo(() =>
    cities?.length ? 
      cities.map(city => ({
        key: city._id,
        value: city._id,
        label: city.name[getLangKey()],
      })) : 
      null, 
  [cities]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  return (
    <Select
      mode={mode}
      value={value}
      onChange={onCityChange}
      optionFilterProp="label"
      options={cityOptions}
      loading={isCitiesPending}
      disabled={isInputDisabled}
      placeholder={inputPlaceholder}
      maxTagCount={maxTagCount}
      className={classes.citySelect}
      showArrow={showArrow}
      showSearch={showSearch}
      allowClear={allowClear}
      filterOption={getSelectFilterOption}
      labelInValue={labelInValue}
    />
  );
};

CitySelect.defaultProps = {
  isDisabled: false,
  placeholder: null,
  maxTagCount: MAX_TAG_COUNT_ON_SELECT_INPUT,
  showArrow: true,
  showSearch: true,
  allowClear: false,
  labelInValue: false,
};

CitySelect.propTypes = {
  filterKey: PropTypes.string,
  mode: PropTypes.oneOf(['multiple', 'tags']),
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  maxTagCount: PropTypes.number,
  showArrow: PropTypes.bool,
  showSearch: PropTypes.bool,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  labelInValue: PropTypes.bool,
};

export default CitySelect;

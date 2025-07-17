import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { selectOptionsSearch } from '@shared/utils/common';
import { SELECT_ALL_OPTION } from '../../constant';

import useStyles from './styles';

const CustomCitySelect = ({
  value,
  mode = 'multiple',
  showArrow = false,
  isDisabled,
  onChange,
  allowClear = false,
  className,
  maxTagCount,
  dropdownRender,
  getPopupContainer,
  loading,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('highLevelDys');

  const cities = useSelector(getCitiesSelector.getData);

  const cityOptions = useMemo(
    () => {
      const options = cities.map(city => {
        return { value: city._id, label: city.name[getLangKey()] };
      });
      options.unshift({ value: SELECT_ALL_OPTION, label: t('SELECT_ALL') });
      return options;
    },
    [cities, t],
  );

  const handleOnChange = selectedCities => {
    if (selectedCities.includes(SELECT_ALL_OPTION)) {
      if (selectedCities.length === cities.length + 1) {
        onChange([]);
      }
      else {
        onChange(cities.map(item => item._id));
      }
    }
    else {
      onChange(selectedCities);
    }
  };

  return (
    <Select
      value={value}
      mode={mode}
      options={cityOptions}
      placeholder={t('ALL_CITIES')}
      onChange={handleOnChange}
      disabled={isDisabled}
      showArrow={showArrow}
      allowClear={allowClear}
      className={`${classes.citySelect} ${className || ''}`}
      filterOption={selectOptionsSearch}
      showSearch
      {...(maxTagCount && { maxTagCount })}
      {...(loading && { loading })}
      {...(dropdownRender && { dropdownRender })}
      {...(getPopupContainer && { getPopupContainer })}
    />
  );
};

export default CustomCitySelect;

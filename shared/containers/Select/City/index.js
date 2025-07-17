import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';

import useStyles from './styles';

const SelectCity = ({
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
  const { t } = useTranslation();

  const cities = useSelector(getCitiesSelector.getData);

  const cityOptions = useMemo(
    () => cities.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    }),
    [cities],
  );

  return (
    <Select
      value={value}
      mode={mode}
      options={cityOptions}
      placeholder={t('global:CITY')}
      onChange={onChange}
      disabled={isDisabled}
      showArrow={showArrow}
      allowClear={allowClear}
      className={`${classes.citySelect} ${className || ''}`}
      filterOption={getSelectFilterOption}
      showSearch
      {...(maxTagCount && { maxTagCount })}
      {...(loading && { loading })}
      {...(dropdownRender && { dropdownRender })}
      {...(getPopupContainer && { getPopupContainer })}
    />
  );
};

export default SelectCity;

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { convertSelectOptions } from '@shared/containers/Select/Country';

import useStyles from './styles';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';

function CountriesSelect({ value, onChange }) {
  const { t } = useTranslation();
  const countries = useSelector(countriesSelector.getData);
  const classes = useStyles();

  return (
    <Select
      selectKey="country"
      placeholder={t('countrySelectionPage:SELECT_COUNTRY')}
      value={value}
      options={convertSelectOptions({ countries })}
      onChange={onChange}
      className={classes.width}
    />
  );
}

export default CountriesSelect;

import { useEffect } from 'react';
import { Alert, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { createMap } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as CountrySelectionModalCreators } from '@shared/containers/HelperContainer/CountrySelectionModal/redux/actions';

const Description = ({ t, handleChangeCountry }) => (
  <Button size="small" type="default" onClick={handleChangeCountry}>
    {t('global:CHANGE_COUNTRY')}
  </Button>
);

const CountrySelectionAlert = props => {
  const { translationKey, itemCountryId } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countries = useSelector(countriesSelector.getData);
  const isPending = useSelector(countriesSelector.getIsPending);
  const countriesMap = createMap(countries);
  const countryName = _.get(countriesMap, [itemCountryId, 'name', getLangKey()]);

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch]);

  const handleChangeCountry = () => {
    dispatch(CountrySelectionModalCreators.setVisibility({ data: true }));
  };

  if (isPending || !countryName) return null;

  return (
    <Alert
      message={t(translationKey, { countryName })}
      description={<Description t={t} handleChangeCountry={handleChangeCountry} />}
      type="warning"
      showIcon
    />
  );
};

export default CountrySelectionAlert;

import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useState } from 'react';
import { Divider, Typography } from 'antd';

import { getLangKey, t } from '@shared/i18n';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators as CountrySelectionCreators } from '@shared/redux/actions/countrySelection';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import useStyles from './styles';
import { createMap, getFilteredOperationalAndOldOperationalCountries } from '@shared/utils/common';

const ClientDetailCountrySelection = ({ countries }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const globalSelectedCountry = getSelectedCountry();
  const currentUser = getUser();
  const [showOldOperationalCountries, setShowOldOperationalCountries] = useState(false);
  const { operationalCountries, oldOperationalCountries } = getFilteredOperationalAndOldOperationalCountries(countries);

  const userCountries = _.get(getUser(), 'countries', []).filter(country => !!country);
  const userCountriesMap = createMap(userCountries);

  const selectCountry = selectedCountry => () => {
    dispatch(CountrySelectionCreators.startCountrySelectionFlow({ selectedCountry, shouldReloadAfterLocalStorage: true }));
  };

  const renderCountry = country => {
    const enabled = currentUser.hasGlobalAccess || userCountriesMap[country._id];
    const isCurrentCountry = country._id === globalSelectedCountry._id;
    const isSelectable = enabled && !isCurrentCountry;
    return (
      <div
        className={[
          classes.countryList,
          enabled ? '' : classes.disabled,
          isCurrentCountry ? classes.currentCountry : '',
        ].join(' ')}
        onClick={isSelectable ? selectCountry(country) : undefined}
        onKeyDown={isSelectable ? selectCountry(country) : undefined}
        role="button"
        tabIndex="0"
        key={country._id}
      >
        <div className={classes.countryFlag}>
          {_.get(country, ['flag'], '')}
        </div>
        <div className={`${classes.countryName} ml-2`}>
          {_.get(country, ['name', getLangKey()], '')}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.countryWrap}>
      {operationalCountries?.map(renderCountry)}
      {oldOperationalCountries?.length ? (
        <>
          {!showOldOperationalCountries ? (
            <Typography.Link className="w-100 text-center m-2" onClick={() => setShowOldOperationalCountries(true)}>
              {t('SEE_OLD_COUNTRIES')}
            </Typography.Link>
          ) : null}
          {showOldOperationalCountries ? (
            <>
              <Divider plain>{t('OLD_COUNTRIES')}</Divider>
              {oldOperationalCountries.map(renderCountry)}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ClientDetailCountrySelection;

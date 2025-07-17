import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Divider, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { get, isEmpty, isString, isNull, isArray } from 'lodash';

import { getLangKey } from '@shared/i18n';
import getirLogo from '@shared/assets/images/getir_purple_logo.png';
import Image from '@shared/components/UI/Image';
import { getUserCountries, getUser, redirectUrlPathSelector } from '@shared/redux/selectors/auth';
import { countriesSelector } from '@shared/redux/selectors/common';
import { Creators } from '@shared/redux/actions/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE, INITIAL_ROUTE, REDIRECT_URL } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import useStyles from './styles';
import { clearLocalStorage } from '@shared/utils/localStorage';
import { createMap, getFilteredOperationalAndOldOperationalCountries } from '@shared/utils/common';

const CountrySelectionPage = () => {
  usePageViewAnalytics({ name: ROUTE.COUNTRY_SELECTION.name, squad: ROUTE.COUNTRY_SELECTION.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('countrySelectionPage');
  const navigate = useNavigate();
  const redirectUrlPath = useSelector(redirectUrlPathSelector.getData);
  const currentUser = getUser();
  const allCountries = useSelector(countriesSelector.getData) || [];
  const allCountriesPending = useSelector(countriesSelector.getIsPending);
  const [showOldOperationalCountries, setShowOldOperationalCountries] = useState(false);

  useEffect(() => {
    dispatch(CommonCreators.getCountriesRequest());
  }, [dispatch]);

  const countries = currentUser.hasGlobalAccess ? allCountries : getUserCountries();
  const countriesMap = createMap(countries);
  const { operationalCountries, oldOperationalCountries } = getFilteredOperationalAndOldOperationalCountries(countries);

  const selectCountry = id => {
    dispatch(Creators.startCountrySelectionFlow({ selectedCountry: countriesMap[id] }));
    if (!isNull(redirectUrlPath) && isArray(redirectUrlPath)) {
      redirectUrlPath?.shift();
      const magicLinkRoute = redirectUrlPath.map(item => `${item}/`);
      const magicLink = magicLinkRoute.join('');
      return navigate(magicLink);
    }

    if (!isEmpty(currentUser?.redirectUrl) && isString(currentUser?.redirectUrl) && currentUser?.redirectUrl !== INITIAL_ROUTE.path) {
      return navigate(currentUser?.redirectUrl);
    }
    return navigate(REDIRECT_URL);
  };

  useEffect(() => {
    if (operationalCountries.length === 1) {
      selectCountry(operationalCountries[0]._id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationalCountries]);

  useEffect(() => {
    const url = redirectUrlPath || currentUser?.redirectUrl;
    if (!url) return;

    const redirectUrl = new URL(url, `${window.location.protocol}//${window.location.host}`);
    const queryParameters = new URLSearchParams(redirectUrl.search);
    if (!queryParameters.has('country')) return;
    const queryCountry = queryParameters.get('country').toLowerCase();

    const countryToSwitchTo = allCountries.find(c => c.code.alpha2.toLowerCase() === queryCountry);
    if (!countryToSwitchTo) return;
    const availableCountries = currentUser.hasGlobalAccess ? allCountries : getUserCountries();
    if (!availableCountries.find(c => c._id === countryToSwitchTo._id)) return;

    selectCountry(countryToSwitchTo._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUrlPath, currentUser?.redirectUrl]);

  const renderCountry = country => (
    <div
      className={classes.countryList}
      onClick={() => {
        return selectCountry(country._id);
      }}
      onKeyDown={() => {
        return selectCountry(country._id);
      }}
      role="button"
      tabIndex="0"
      key={country._id}
    >
      <div className={classes.countryFlag}>{get(country, ['flag'], '')}</div>
      <div className={`${classes.countryName} ml-2`}>{get(country, ['name', getLangKey()], '')}</div>
    </div>
  );

  return (
    <div className={classes.mainWrapper}>
      <Card className={classes.countryCard}>
        <div className="mb-4">
          <Image src={getirLogo} height={50} alt="logo" />
        </div>
        <div className={classes.childWrapper}>
          <h1 className={classes.countryTitle}>{t('SELECT_COUNTRY')}</h1>
          <div className={classes.countryWrap}>
            {allCountriesPending ? (
              <Spin />
            ) : (
              <>
                {operationalCountries.map(renderCountry)}
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

              </>
            )}
          </div>
          {
            (!allCountriesPending && countries.length === 0) && (
              <div style={{ textAlign: 'center' }}>
                <p>TR: Seçebileceğin bir ülke bulunamadı.</p>
                <p>EN: No country found for selection.</p>
                <Button
                  danger
                  onClick={() => {
                    clearLocalStorage();
                  }}
                >
                  Logout
                </Button>
              </div>
            )
          }
        </div>
      </Card>
    </div>
  );
};

export default CountrySelectionPage;

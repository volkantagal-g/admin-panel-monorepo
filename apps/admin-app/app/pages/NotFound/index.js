import { useEffect } from 'react';
import { Button, Card, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { ROUTE, INITIAL_ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import { getUser, getUserCountries } from '@shared/redux/selectors/auth';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@shared/redux/actions/countrySelection';
import useStyles from './styles';

import Image from '@shared/components/UI/Image';
import getirLogo from '@shared/assets/images/getir_purple_logo.png';
import { getLangKey } from '@shared/i18n';
import { clearLocalStorage } from '@shared/utils/localStorage';

const NotFoundPage = () => {
  usePageViewAnalytics({ name: ROUTE.NOT_FOUND.name, squad: ROUTE.NOT_FOUND.squad });
  const dispatch = useDispatch();
  const classes = useStyles();

  const navigate = useNavigate();

  const currentUser = getUser();
  const allCountries = useSelector(countriesSelector.getData) || [];
  const allCountriesPending = useSelector(countriesSelector.getIsPending);

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch]);

  const countries = currentUser.hasGlobalAccess ? allCountries : getUserCountries();

  const selectCountry = id => {
    const selectedCountry = countries.find(countryItem => {
      return countryItem._id === id;
    });
    dispatch(Creators.startCountrySelectionFlow({ selectedCountry }));
    return navigate(INITIAL_ROUTE.path);
  };

  return (
    <div className={classes.mainWrapper}>
      <Card className={classes.countryCard}>
        <div className="mb-4">
          <Image src={getirLogo} height={50} alt="logo" />
        </div>
        <div className={classes.childWrapper}>
          <h1 className={classes.notFoundTitle}>
            The page you want to visit is not available in the list of countries you can access.
          </h1>
          <h1 className={classes.notFoundTitle}>
            Please choose a country to proceed to the home page.
          </h1>
          <div className={classes.countryWrap}>
            {allCountriesPending && (
              <Spin />
            )}
            {countries.map(country => {
              return (
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
            })}

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

export default NotFoundPage;

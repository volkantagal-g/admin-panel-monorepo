import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Divider, Modal, Typography } from 'antd';
import { get as lget } from 'lodash';
import { compose } from 'redux';

import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { getUserCountries, getUser } from '@shared/redux/selectors/auth';
import { Creators as CountrySelectionCreators } from '@shared/redux/actions/countrySelection';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getCountrySelectionModalVisibilitySelector } from './redux/selectors';
import { Creators as CountrySelectionModalCreators } from './redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import reducer from './redux/reducer';
import { createMap, getFilteredOperationalAndOldOperationalCountries } from '@shared/utils/common';

const DEFAULT_ALL_COUNTRIES = [];

const CountrySelectionModal = () => {
  const visibility = useSelector(getCountrySelectionModalVisibilitySelector.getVisibility);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['countrySelectionPage']);
  const allCountries = useSelector(countriesSelector.getData) || DEFAULT_ALL_COUNTRIES;
  const currentUser = getUser();
  const [showOldOperationalCountries, setShowOldOperationalCountries] = useState(false);

  const handleCancel = () => {
    dispatch(CountrySelectionModalCreators.setVisibility({ data: false }));
  };

  const getCountries = () => (
    currentUser.hasGlobalAccess ? allCountries : getUserCountries()
  );

  const countries = getCountries();
  const countriesMap = createMap(countries);
  const { operationalCountries, oldOperationalCountries } = getFilteredOperationalAndOldOperationalCountries(countries);

  const onClick = id => {
    dispatch(CountrySelectionCreators.startCountrySelectionFlow({ selectedCountry: countriesMap[id], shouldReloadAfterLocalStorage: true }));
  };

  const renderCountry = country => {
    return (
      <div
        className={classes.countryList}
        onClick={() => {
          return onClick(country._id);
        }}
        onKeyDown={() => {
          return onClick(country._id);
        }}
        role="button"
        tabIndex="0"
        key={country._id}
      >
        <div className={classes.countryFlag}>{lget(country, ['flag'], '')}</div>
        <div className={`${classes.countryName} ml-2`}>{lget(country, ['name', getLangKey()], '')}</div>
      </div>
    );
  };

  return (
    <Modal visible={visibility} centered onCancel={handleCancel} footer={null}>
      <div className={classes.childWrapper}>
        <h1 className={classes.countryTitle}>{t('SELECT_COUNTRY')}</h1>
        <div className={classes.countryWrap}>
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
        </div>
      </div>
    </Modal>
  );
};

const reduxKey = REDUX_KEY.HELPER.HELPER_COUNTRY_SELECTION_MODAL;
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer)(CountrySelectionModal);

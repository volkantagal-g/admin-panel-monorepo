import { Button, Dropdown, Menu } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { Creators } from '@shared/redux/actions/countrySelection';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getUserCountries, getUser } from '@shared/redux/selectors/auth';
import { createMap, getFilteredOperationalAndOldOperationalCountries } from '@shared/utils/common';

const { Item } = Menu;

export default function SelectCountryDropdown({ classes }) {
  const dispatch = useDispatch();

  const selectedCountry = getSelectedCountry();

  const user = getUser();
  const allCountries = useSelector(countriesSelector.getData);
  const userCountries = getUserCountries();

  const countries = user.hasGlobalAccess ? allCountries : userCountries;
  const countriesMap = createMap(countries);
  const { operationalCountries, oldOperationalCountries } = getFilteredOperationalAndOldOperationalCountries(countries);

  const menu = (
    <Menu>
      {operationalCountries.map(country => (
        <Item key={country._id} onClick={() => onClick(country._id)}>
          {country.name[getLangKey()]}
        </Item>
      ))}
      {oldOperationalCountries?.length ? (
        <Menu.SubMenu key="oldCountries" title={t('OLD_COUNTRIES')}>
          {oldOperationalCountries.map(country => (
            <Item key={country._id} onClick={() => onClick(country._id)}>
              {country.name[getLangKey()]}
            </Item>
          ))}
        </Menu.SubMenu>
      ) : null}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomLeft"
      trigger={['click']}
    >
      <Button className={classes.countrySelectionButton}>
        <span>
          {get(selectedCountry, ['flag'], '')}
        </span>
        <span>
          {selectedCountry.name[getLangKey()]}
        </span>
        <span className={classes.countryCode}>
          {get(selectedCountry, ['code', 'alpha2'], '')}
        </span>
      </Button>
    </Dropdown>
  );

  function onClick(id) {
    dispatch(Creators.startCountrySelectionFlow({ selectedCountry: countriesMap[id], shouldReloadAfterLocalStorage: true }));
  }
}

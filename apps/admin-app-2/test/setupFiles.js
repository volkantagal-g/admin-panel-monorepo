import 'fake-indexeddb/auto';
import moment from 'moment-timezone';

import { setPermissionsToLocalStorage } from '@app/redux/sagas/common';
import { setSelectedCountryToLocalStorage } from '@app/redux/sagas/countrySelection';
import { setTokenToLocalStorage, setUserToLocalStorage } from '@app/redux/sagas/auth';
import { setSelectedLanguageToLocalStorage } from '@app/redux/sagas/languageSelection';
import { Creators as CountryCreators } from '@app/redux/actions/countrySelection';
import store from '@app/redux/store';

import { INITIAL_COUNTRY, INITIAL_LANGUAGE, TEST_USER } from './mock/data/initialState';
import { indexedDb } from '@app/indexedDb';
import { mockedPages } from '@app/api/page/index.mock.data';

// initial localStorage, jest automatically mocks localStorage
setTokenToLocalStorage('RandomTestToken');
setUserToLocalStorage(TEST_USER);
setPermissionsToLocalStorage([]);
setSelectedCountryToLocalStorage(JSON.stringify(INITIAL_COUNTRY));
setSelectedLanguageToLocalStorage(JSON.stringify(INITIAL_LANGUAGE));
store.dispatch(CountryCreators.setSelectedCountry({ selectedCountry: INITIAL_COUNTRY }));
const { timezone } = INITIAL_COUNTRY.timezones[0];
moment.tz.setDefault(timezone);

// Testing map components and libraries createObjectURL should be mocked
window.URL.createObjectURL = () => {};

indexedDb.pages.bulkPut(mockedPages);

import { setSelectedCountryToLocalStorage } from '@app/redux/sagas/countrySelection';
import { setTokenToLocalStorage, setUserToLocalStorage } from '@app/redux/sagas/auth';
import { setSelectedLanguageToLocalStorage } from '@app/redux/sagas/languageSelection';

beforeAll(() => {
  setTokenToLocalStorage('');
  setUserToLocalStorage('');
  setSelectedCountryToLocalStorage(JSON.stringify(null));
  setSelectedLanguageToLocalStorage(JSON.stringify(null));
});

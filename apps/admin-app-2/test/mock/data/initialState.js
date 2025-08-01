import { mockedAuthTempToken } from '@app/api/auth/index.mock.data';
import { mockedCountries } from '@app/api/countryInfo/index.mock.data';

const INITIAL_TEST_COUNTRY_CODE = 'TR';

export const INITIAL_COUNTRY = mockedCountries.find(country => country.code.alpha2 === INITIAL_TEST_COUNTRY_CODE);

export const INITIAL_LANGUAGE = 'en';
export const TEST_USER = mockedAuthTempToken('RandomTestToken');

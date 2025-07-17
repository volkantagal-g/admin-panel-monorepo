// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import * as MOCKS from './index.mock.data';

const getDivisionsUrl = '/countryInfo/getDivisions';

const getDivisionsMockOptions = {
  url: getDivisionsUrl,
  successData: MOCKS.mockedDivisions,
};

const getDivisionUrl = '/countryInfo/getDivision';

const getDivisionMockOptions = {
  url: getDivisionUrl,
  handler: req => {
    const countryId = req.headers.get('country');
    // Turkey id test
    if (countryId === MOCKS.mockedCountries[0]._id) return { data: null };

    return { data: MOCKS.mockedDivision };
  },
};

const getCountriesUrl = '/countryInfo/getCountries';

const getCountriesMockOptions = {
  url: getCountriesUrl,
  successData: MOCKS.mockedInfoCountries,
};

const getCitiesUrl = '/countryInfo/getCities';
const getCitiesMockOptions = {
  url: getCitiesUrl,
  successData: MOCKS.mockedCities,
};

export default [getDivisionMockOptions, getDivisionsMockOptions, getCountriesMockOptions, getCitiesMockOptions];

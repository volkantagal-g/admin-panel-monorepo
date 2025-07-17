import { COUNTRY_MISMATCH_ERROR_TYPE } from './constants';

export function getMismatchResult({ countryCode, countryId, selectedCountry, countries, apiError }) {
  const { _id, code } = selectedCountry;
  const { alpha2 } = code;

  let isThereAMismatch = false;
  let mismatchCase = null;
  let nextCountry = null;

  if (countryCode && alpha2 !== countryCode) {
    isThereAMismatch = true;
    mismatchCase = `countryCode: ${countryCode}`;
    nextCountry = countries.find(country => country.code.alpha2 === countryCode);
  }
  else if (countryId && _id !== countryId) {
    isThereAMismatch = true;
    mismatchCase = `countryId: ${countryId}`;
    nextCountry = countries.find(country => country._id === countryId);
  }
  else if (apiError) {
    // apiError is usually an axios error object, so cover that
    const apiResponseData = apiError?.response?.data || apiError;
    if (apiResponseData?.type === COUNTRY_MISMATCH_ERROR_TYPE) {
      isThereAMismatch = true;
      const { dataCountryCode, dataCountryId } = apiResponseData;
      mismatchCase = `apiError: ${dataCountryCode || dataCountryId}`;
      nextCountry = countries.find(country => {
        if (dataCountryCode && country.code.alpha2 === dataCountryCode) {
          return true;
        }
        if (dataCountryId && country._id === dataCountryId) {
          return true;
        }
        return false;
      });
    }
  }

  if (isThereAMismatch && !nextCountry) {
    throw new Error(`InterceptCountryMismatchError, mismatch exists but next country not found, REASON: < ${mismatchCase} >`);
  }

  return { nextCountry, isThereAMismatch };
}

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.COUNTRY_CITY_MANAGEMENT;

export const countryCityManagementSelector = {
  countryData: state => state?.[reducerKey]?.countriesWPageSize?.data,
  getCreateCountry: state => state?.[reducerKey]?.createdCountry?.data,
  getUpdateCountry: state => state?.[reducerKey]?.updatedCountry?.data,
  countryBoundaryData: state => state?.[reducerKey]?.countryBoundary?.data,
  cityBoundaryData: state => state?.[reducerKey]?.cityBoundary?.data,
  isPendingCountryBoundary: state => state?.[reducerKey]?.countryBoundary?.isPending,
  isPendingCityBoundary: state => state?.[reducerKey]?.cityBoundary?.isPending,
  selectedCountryId: state => state?.[reducerKey]?.countryId,
};

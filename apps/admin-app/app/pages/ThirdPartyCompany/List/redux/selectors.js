import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.THIRD_PARTY_COMPANY.LIST;

export const thirdPartyCompaniesSelector = {
  getData: state => state[reducerKey]?.thirdPartyCompanies?.data,
  getIsPending: state => state[reducerKey]?.thirdPartyCompanies?.isPending,
};

export const filtersSelector = { getSearchParam: state => state[reducerKey]?.filters?.searchParam };

export const filteredThirdPartyCompaniesSelector = {
  getData: state => {
    const thirdPartyCompanies = state[reducerKey]?.thirdPartyCompanies?.data;
    const searchParam = state[reducerKey]?.filters?.searchParam;

    return thirdPartyCompanies.filter(thirdPartyCompany => {
      return thirdPartyCompany?.name?.toLowerCase().indexOf(searchParam?.toLowerCase()) > -1;
    });
  },
};

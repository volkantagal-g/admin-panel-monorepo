import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.THIRD_PARTY_COMPANY.NEW;

export const createThirdPartyCompanySelector = {
  getData: state => state[reducerKey]?.createThirdPartyCompany?.data,
  getIsPending: state => state[reducerKey]?.createThirdPartyCompany?.isPending,
};

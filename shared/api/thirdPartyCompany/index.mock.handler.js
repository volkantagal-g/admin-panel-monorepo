import * as MOCKS from './index.mock.data';

const getThirdPartyCompaniesUrl = '/getThirdPartyCompanies';
const getThirdPartyCompanyAllowedRoutesUrl = '/getAllowedRoutes';
const getThirdPartyCompanyByIdUrl = '/getThirdPartyCompanyById';
const getCredentialsByCompanyIdUrl = '/getCredentialsByCompanyId';

const getThirdPartyCompaniesMockOptions = {
  url: getThirdPartyCompaniesUrl,
  successData: MOCKS.mockedThirdPartyCompanies,
};

const getThirdPartyCompanyAllowedRoutesMockOptions = {
  url: getThirdPartyCompanyAllowedRoutesUrl,
  successData: MOCKS.mockedThirdPartyCompanyAllowedRoutes,
};

const getThirdPartyCompanyByIdOptions = {
  url: getThirdPartyCompanyByIdUrl,
  handler: req => {
    const { id } = req.body;
    return { data: MOCKS.mockedThirdPartyCompanyByIdData(id) };
  },
};

const getCredentialsByCompanyIdOptions = {
  url: getCredentialsByCompanyIdUrl,
  handler: req => {
    const { id } = req.body;
    return { data: MOCKS.mockedCredentialsByCompanyIdData(id) };
  },
};

export default [
  getThirdPartyCompaniesMockOptions,
  getThirdPartyCompanyAllowedRoutesMockOptions,
  getThirdPartyCompanyByIdOptions,
  getCredentialsByCompanyIdOptions,
];

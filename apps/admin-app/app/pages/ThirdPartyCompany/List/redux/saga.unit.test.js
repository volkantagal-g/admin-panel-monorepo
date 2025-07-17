import { testSaga } from 'redux-saga-test-plan';

import {
  getThirdPartyCompaniesRequest,
  watchGetThirdPartyCompaniesRequest,
} from '@app/pages/ThirdPartyCompany/List/redux/saga';
import { Creators, Types } from '@app/pages/ThirdPartyCompany/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getThirdPartyCompanies } from '@shared/api/thirdPartyCompany';
import { mockedThirdPartyCompanies } from '@shared/api/thirdPartyCompany/index.mock.data';

describe('ThirdPartyCompany/List', () => {
  const thirdPartyCompanyList = [...mockedThirdPartyCompanies];
  describe('saga #getThirdPartyCompaniesRequest', () => {
    it('should call the getThirdPartyCompaniesRequest (success)', () => {
      testSaga(getThirdPartyCompaniesRequest)
        .next()
        .call(getThirdPartyCompanies)
        .next(thirdPartyCompanyList)
        .put(Creators.getThirdPartyCompaniesSuccess({ thirdPartyCompanies: thirdPartyCompanyList }))
        .next()
        .isDone();
    });

    it('should call the getThirdPartyCompaniesRequest (failure)', () => {
      const fakeError = new Error('failed at getThirdPartyCompaniesRequest');
      testSaga(getThirdPartyCompaniesRequest)
        .next()
        .call(getThirdPartyCompanies)
        .next(thirdPartyCompanyList)
        .throw(fakeError)
        .put(Creators.getThirdPartyCompaniesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetThirdPartyCompaniesRequest', () => {
    it('should call the watchGetThirdPartyCompaniesRequest', () => {
      testSaga(watchGetThirdPartyCompaniesRequest)
        .next()
        .takeLatest(Types.GET_THIRD_PARTY_COMPANIES_REQUEST, getThirdPartyCompaniesRequest)
        .next()
        .isDone();
    });
  });
});

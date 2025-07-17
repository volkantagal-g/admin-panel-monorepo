import { testSaga } from 'redux-saga-test-plan';

import {
  createThirdPartyCompanyRequest,
  watchCreateThirdPartyCompanyRequest,
} from '@app/pages/ThirdPartyCompany/New/redux/saga';
import { Creators, Types } from '@app/pages/ThirdPartyCompany/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createThirdPartyCompany } from '@shared/api/thirdPartyCompany';

const mockCreateThirdPartyCompanyPayload = {
  name: 'test  rep long name 3rd Party',
  description: ' 3rd Party LTD',
};

describe('ThirdPartyCompany/New', () => {
  describe('saga #createThirdPartyCompanyRequest', () => {
    const thirdPartyCompany = {};

    it('should call the createThirdPartyCompanyRequest (success)', () => {
      testSaga(createThirdPartyCompanyRequest, { body: { ...mockCreateThirdPartyCompanyPayload } })
        .next()
        .call(createThirdPartyCompany, { body: { ...mockCreateThirdPartyCompanyPayload } })
        .next(thirdPartyCompany)
        .put(Creators.createThirdPartyCompanySuccess({ thirdPartyCompany }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the createThirdPartyCompanyRequest (failure)', () => {
      const fakeError = new Error('failed at createThirdPartyCompanyRequest');
      testSaga(createThirdPartyCompanyRequest, { body: { ...mockCreateThirdPartyCompanyPayload } })
        .next()
        .call(createThirdPartyCompany, { body: { ...mockCreateThirdPartyCompanyPayload } })
        .next(thirdPartyCompany)
        .throw(fakeError)
        .put(Creators.createThirdPartyCompanyFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchCreateThirdPartyCompanyRequest', () => {
    it('should call the watchCreateThirdPartyCompanyRequest', () => {
      testSaga(watchCreateThirdPartyCompanyRequest)
        .next()
        .takeLatest(Types.CREATE_THIRD_PARTY_COMPANY_REQUEST, createThirdPartyCompanyRequest)
        .next()
        .isDone();
    });
  });
});

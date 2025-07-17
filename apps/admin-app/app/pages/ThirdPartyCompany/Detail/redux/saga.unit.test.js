import { testSaga } from 'redux-saga-test-plan';

import {
  getThirdPartyCompanyByIdRequest,
  watchGetThirdPartyCompanyByIdRequest,
  getCredentialsByCompanyIdRequest,
  watchGetCredentialsByCompanyIdRequest,
} from '@app/pages/ThirdPartyCompany/Detail/redux/saga';
import { Creators, Types } from '@app/pages/ThirdPartyCompany/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getThirdPartyCompanyById,
  getCredentialsByCompanyId,
} from '@shared/api/thirdPartyCompany';
import {
  mockedActiveThirdPartyCompany,
  mockedCredentialsByCompanyId,
} from '@shared/api/thirdPartyCompany/index.mock.data';

describe('ThirdPartyCompany/Detail', () => {
  const thirdPartyCompany = { ...mockedActiveThirdPartyCompany };
  describe('saga #getThirdPartyCompanyByIdRequest', () => {
    it('should call the getThirdPartyCompanyByIdRequest (success)', () => {
      testSaga(getThirdPartyCompanyByIdRequest, { id: '62f21f8d53625330fcdec8fe' })
        .next() // select company id
        .next() // make api call
        .call(getThirdPartyCompanyById, { id: '62f21f8d53625330fcdec8fe' })
        .next(thirdPartyCompany)
        .put(Creators.getThirdPartyCompanyByIdSuccess({ data: thirdPartyCompany }))
        .next()
        .isDone();
    });
    it('should call the getThirdPartyCompanyByIdRequest (failure)', () => {
      const fakeError = new Error('failed at getThirdPartyCompanyByIdRequest');
      testSaga(getThirdPartyCompanyByIdRequest, { id: '62f21f8d53625330fcdec8fe' })
        .next()
        .next()
        .call(getThirdPartyCompanyById, { id: '62f21f8d53625330fcdec8fe' })
        .next(thirdPartyCompany)
        .throw(fakeError)
        .put(Creators.getThirdPartyCompanyByIdFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should call the watchGetThirdPartyCompanyByIdRequest', () => {
      testSaga(watchGetThirdPartyCompanyByIdRequest)
        .next()
        .takeLatest(Types.GET_THIRD_PARTY_COMPANY_BY_ID_REQUEST, getThirdPartyCompanyByIdRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #getCredentialsByCompanyIdRequest', () => {
    const credential = { ...mockedCredentialsByCompanyId };
    it('should call the getCredentialsByCompanyIdRequest (success)', () => {
      testSaga(getCredentialsByCompanyIdRequest, { id: '62f62e7c0c46f43df09863e8' })
        .next()
        .next()
        .call(getCredentialsByCompanyId, { id: '62f62e7c0c46f43df09863e8' })
        .next(credential)
        .put(Creators.getCredentialsByCompanyIdSuccess({ data: credential }))
        .next()
        .isDone();
    });
    it('should call the getCredentialsByCompanyIdRequest (failure)', () => {
      const fakeError = new Error('failed at getCredentialsByCompanyIdRequest');
      testSaga(getCredentialsByCompanyIdRequest, { id: '62f62e7c0c46f43df09863e8' })
        .next()
        .next()
        .call(getCredentialsByCompanyId, { id: '62f62e7c0c46f43df09863e8' })
        .next(credential)
        .throw(fakeError)
        .put(Creators.getCredentialsByCompanyIdFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should call the watchGetCredentialsByCompanyIdRequest', () => {
      testSaga(watchGetCredentialsByCompanyIdRequest)
        .next()
        .takeLatest(Types.GET_CREDENTIALS_BY_COMPANY_ID_REQUEST, getCredentialsByCompanyIdRequest)
        .next()
        .isDone();
    });
  });
});

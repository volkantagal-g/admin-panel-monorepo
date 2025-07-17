import { testSaga } from 'redux-saga-test-plan';

import {
  SAMPLE_EMAIL_ID,
  sampleGenericEmailRequest,
  sampleGenericEmailResponse,
} from '@app/pages/Email/index.mock.data';

import { Creators } from '@app/pages/Email/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getEmail, emailUpdate } from '@shared/api/email';
import { getEmailRequest, updateEmailRequest } from '@app/pages/Email/Detail/redux/saga';

describe('Email/Detail ', () => {
  const fakeError = new Error('404 Not Found');

  describe('saga #getEmailRequest', () => {
    it('should call the getEmailRequest (success)', () => {
      testSaga(getEmailRequest, { emailId: SAMPLE_EMAIL_ID })
        .next()
        .call(getEmail, { id: SAMPLE_EMAIL_ID })
        .next({ data: sampleGenericEmailResponse })
        .put(Creators.getEmailSuccess({ data: sampleGenericEmailResponse }))
        .next()
        .isDone();
    });

    it('should call the getEmailRequest (failure)', () => {
      testSaga(getEmailRequest, { emailId: SAMPLE_EMAIL_ID })
        .next()
        .call(getEmail, { id: SAMPLE_EMAIL_ID })
        .next(sampleGenericEmailRequest)
        .throw(fakeError)
        .put(Creators.getEmailFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateEmailRequest ', () => {
    it.skip('should call the updateEmailRequest (success)', () => {
      testSaga(updateEmailRequest, { body: sampleGenericEmailRequest, id: SAMPLE_EMAIL_ID })
        .next()
        .call(emailUpdate, { body: sampleGenericEmailRequest, id: SAMPLE_EMAIL_ID })
        .next({ data: sampleGenericEmailResponse })
        .put(Creators.updateEmailSuccess({ data: sampleGenericEmailResponse }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it.skip('should call the updateEmailRequest (failure)', () => {
      const errMessage = '404 Not Found';
      const customErr = { response: { data: { errors: [new Error(errMessage)] } } };

      testSaga(updateEmailRequest, { body: sampleGenericEmailRequest, id: SAMPLE_EMAIL_ID })
        .next()
        .call(emailUpdate, { body: sampleGenericEmailRequest, id: SAMPLE_EMAIL_ID })
        .next(sampleGenericEmailRequest)
        .throw(customErr)
        .put(Creators.updateEmailFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});

import { testSaga } from 'redux-saga-test-plan';

import { SAMPLE_EMAIL_ID, sampleEmailRequest } from '@app/pages/Email/index.mock.data';

import { Creators } from '@app/pages/Email/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { emailSave } from '@shared/api/email';
import { emailSaveRequest } from '@app/pages/Email/New/redux/saga';

describe('Email/New ', () => {
  const errMessage = '404 Not Found';
  const customErr = { response: { data: { errors: [new Error(errMessage)] } } };
  describe('saga #emailSaveRequest', () => {
    it('should call the emailSave (success)', () => {
      testSaga(emailSaveRequest, { body: sampleEmailRequest })
        .next()
        .call(emailSave, sampleEmailRequest)
        .next({ data: { id: SAMPLE_EMAIL_ID, ...sampleEmailRequest } })
        .put(Creators.emailSaveSuccess({ data: { id: SAMPLE_EMAIL_ID, ...sampleEmailRequest } }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the emailSave (failure)', () => {
      testSaga(emailSaveRequest, { body: sampleEmailRequest })
        .next()
        .call(emailSave, sampleEmailRequest)
        .throw(customErr)
        .put(Creators.emailSaveFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});

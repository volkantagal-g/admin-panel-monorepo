import { testSaga } from 'redux-saga-test-plan';

import { SAMPLE_SMS_ID, sampleSmsRequest } from '@app/pages/Sms/index.mock.data';

import { Creators } from '@app/pages/Sms/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { smsSave } from '@shared/api/sms';
import { smsSaveRequest } from '@app/pages/Sms/New/redux/saga';

describe('Sms/New ', () => {
  const errMessage = '404 Not Found';
  const customErr = { response: { data: { errors: [new Error(errMessage)] } } };
  describe('saga #smsSaveRequest', () => {
    it('should call the smsSave (success)', () => {
      testSaga(smsSaveRequest, { body: sampleSmsRequest })
        .next()
        .call(smsSave, { body: sampleSmsRequest })
        .next({ data: { id: SAMPLE_SMS_ID, ...sampleSmsRequest } })
        .put(Creators.smsSaveSuccess({ data: { id: SAMPLE_SMS_ID, ...sampleSmsRequest } }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the smsSave (failure)', () => {
      testSaga(smsSaveRequest, { body: sampleSmsRequest })
        .next()
        .call(smsSave, { body: sampleSmsRequest })
        .throw(customErr)
        .put(Creators.smsSaveFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});

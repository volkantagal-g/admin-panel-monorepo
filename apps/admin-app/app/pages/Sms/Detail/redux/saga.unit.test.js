import { testSaga } from 'redux-saga-test-plan';

import {
  SAMPLE_SMS_ID,
  sampleGenericSmsRequest,
  sampleGenericSmsResponse,
} from '@app/pages/Sms/index.mock.data';

import { Creators } from '@app/pages/Sms/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSms, smsUpdate } from '@shared/api/sms';
import { getSmsRequest, updateSmsRequest } from '@app/pages/Sms/Detail/redux/saga';

describe('Sms/Detail ', () => {
  const fakeError = new Error('404 Not Found');

  describe('saga #getSmsRequest', () => {
    it('should call the getSmsRequest (success)', () => {
      testSaga(getSmsRequest, { smsId: SAMPLE_SMS_ID })
        .next()
        .call(getSms, { id: SAMPLE_SMS_ID })
        .next({ data: sampleGenericSmsResponse })
        .put(Creators.getSmsSuccess({ data: sampleGenericSmsResponse }))
        .next()
        .isDone();
    });

    it('should call the getSmsRequest (failure)', () => {
      testSaga(getSmsRequest, { smsId: SAMPLE_SMS_ID })
        .next()
        .call(getSms, { id: SAMPLE_SMS_ID })
        .next(sampleGenericSmsRequest)
        .throw(fakeError)
        .put(Creators.getSmsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateSmsRequest ', () => {
    it('should call the updateSmsRequest (success)', () => {
      testSaga(updateSmsRequest, { body: sampleGenericSmsRequest, id: SAMPLE_SMS_ID })
        .next()
        .call(smsUpdate, { body: sampleGenericSmsRequest, id: SAMPLE_SMS_ID })
        .next({ data: sampleGenericSmsResponse })
        .put(Creators.updateSmsSuccess({ data: sampleGenericSmsResponse }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateSmsRequest (failure)', () => {
      const errMessage = '404 Not Found';
      const customErr = { response: { data: { errors: [new Error(errMessage)] } } };

      testSaga(updateSmsRequest, { body: sampleGenericSmsRequest, id: SAMPLE_SMS_ID })
        .next()
        .call(smsUpdate, { body: sampleGenericSmsRequest, id: SAMPLE_SMS_ID })
        .next(sampleGenericSmsRequest)
        .throw(customErr)
        .put(Creators.updateSmsFailure({ error: { message: errMessage } }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});

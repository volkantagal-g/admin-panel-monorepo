import { manipulateValuesBeforeSubmit } from './formHelpers';
import { sampleSmsFormPayload, sampleSmsRequest } from '@app/pages/Sms/index.mock.data';

describe('Edit Sms form helpers', () => {
  it('should morph for be service before api request', () => {
    const payload = manipulateValuesBeforeSubmit(sampleSmsFormPayload);
    expect(payload).toEqual(sampleSmsRequest);
  });
});

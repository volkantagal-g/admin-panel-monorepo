import { manipulateValuesBeforeSubmit } from './formHelpers';
import { sampleEmailFormPayload, sampleEmailRequest } from '@app/pages/Email/index.mock.data';

describe('Email detail form helpers', () => {
  it('should morph for be service before api request', () => {
    const payload = manipulateValuesBeforeSubmit(sampleEmailFormPayload);
    expect(payload).toEqual(sampleEmailRequest);
  });
});

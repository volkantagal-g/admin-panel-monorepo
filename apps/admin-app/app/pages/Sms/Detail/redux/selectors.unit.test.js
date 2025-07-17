import { sampleGenericSmsResponse } from '@app/pages/Sms/index.mock.data';

import { REDUX_KEY } from '@shared/shared/constants';

import { smsDetailSelector } from '@app/pages/Sms/Detail/redux/selectors';

const reducerKey = REDUX_KEY.SMS.DETAIL;

describe('Sms/Detail', () => {
  describe('#smsDetailSelector', () => {
    describe('#smsDetailSelector.getData', () => {
      it('receivedResult should equal to received object (when data is object)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { data: { sampleGenericSmsResponse } } } };
        const receivedResult = smsDetailSelector.getData(fakeStoreState);
        const expectedResult = { sampleGenericSmsResponse };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is null)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { data: null } } };
        const receivedResult = smsDetailSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { data: undefined } } };
        const receivedResult = smsDetailSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#smsDetailSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { isPending: true } } };
        const receivedResult = smsDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is null)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { isPending: null } } };
        const receivedResult = smsDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { isPending: undefined } } };
        const receivedResult = smsDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#smsDetailSelector.getErrors', () => {
      const fakeError = new Error('404 Not Found');

      it('receivedResult should equal to error', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { error: fakeError } } };
        const receivedResult = smsDetailSelector.getError(fakeStoreState);
        const expectedResult = fakeError;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to null (when error is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { smsDetail: { error: undefined } } };
        const receivedResult = smsDetailSelector.getError(fakeStoreState);
        const expectedResult = null;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });
});

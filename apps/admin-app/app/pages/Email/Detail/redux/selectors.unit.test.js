import { sampleGenericEmailResponse } from '@app/pages/Email/index.mock.data';

import { REDUX_KEY } from '@shared/shared/constants';

import { emailDetailSelector } from '@app/pages/Email/Detail/redux/selectors';

const reducerKey = REDUX_KEY.EMAIL.DETAIL;

describe('Email/Detail', () => {
  describe('#emailDetailSelector', () => {
    describe('#emailDetailSelector.getData', () => {
      it('receivedResult should equal to received object (when data is object)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { data: { sampleGenericEmailResponse } } } };
        const receivedResult = emailDetailSelector.getData(fakeStoreState);
        const expectedResult = { sampleGenericEmailResponse };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is null)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { data: null } } };
        const receivedResult = emailDetailSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { data: undefined } } };
        const receivedResult = emailDetailSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#emailDetailSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { isPending: true } } };
        const receivedResult = emailDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is null)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { isPending: null } } };
        const receivedResult = emailDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { isPending: undefined } } };
        const receivedResult = emailDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#emailDetailSelector.getErrors', () => {
      const fakeError = new Error('404 Not Found');

      it('receivedResult should equal to error', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { error: fakeError } } };
        const receivedResult = emailDetailSelector.getError(fakeStoreState);
        const expectedResult = fakeError;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to null (when error is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { emailDetail: { error: undefined } } };
        const receivedResult = emailDetailSelector.getError(fakeStoreState);
        const expectedResult = null;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });
});

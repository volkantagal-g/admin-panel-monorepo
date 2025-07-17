import { sampleGenericPopupResponse } from '@app/pages/Popup/index.mock.data';

import { REDUX_KEY } from '@shared/shared/constants';

import { getPopupDetailSelector } from '@app/pages/Popup/Detail/redux/selectors';

const reducerKey = REDUX_KEY.POPUP.DETAIL;

describe('Popup/Detail', () => {
  describe('#getPopupDetailSelector', () => {
    describe('#getPopupDetailSelector.getData', () => {
      it('receivedResult should equal to received object (when data is object)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { data: { sampleGenericPopupResponse } } } };
        const receivedResult = getPopupDetailSelector.getData(fakeStoreState);
        const expectedResult = { sampleGenericPopupResponse };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is null)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { data: null } } };
        const receivedResult = getPopupDetailSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { data: undefined } } };
        const receivedResult = getPopupDetailSelector.getData(fakeStoreState);
        const expectedResult = {};
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#getPopupDetailSelector.getIsPending', () => {
      it('receivedResult should equal to true (when isPending is true)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { isPending: true } } };
        const receivedResult = getPopupDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = true;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is null)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { isPending: null } } };
        const receivedResult = getPopupDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to false (when isPending is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { isPending: undefined } } };
        const receivedResult = getPopupDetailSelector.getIsPending(fakeStoreState);
        const expectedResult = false;
        expect(receivedResult).toEqual(expectedResult);
      });
    });

    describe('#getPopupDetailSelector.getErrors', () => {
      const fakeError = new Error('404 Not Found');

      it('receivedResult should equal to error', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { error: fakeError } } };
        const receivedResult = getPopupDetailSelector.getErrors(fakeStoreState);
        const expectedResult = fakeError;
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to null (when error is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { popupDetail: { error: undefined } } };
        const receivedResult = getPopupDetailSelector.getErrors(fakeStoreState);
        const expectedResult = null;
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });
});

import { samplePopupResults } from '@app/pages/Popup/index.mock.data';

import { REDUX_KEY } from '@shared/shared/constants';

import { resultsSelector } from '@app/pages/Popup/List/redux/selectors';

const reducerKey = REDUX_KEY.POPUP.LIST;

describe('Popup/Detail', () => {
  describe('#getPopupDetailSelector', () => {
    describe('#resultsSelector.getResults', () => {
      it('receivedResult should equal to received object (when data is object)', () => {
        const fakeStoreState = { [reducerKey]: { results: { data: { samplePopupResults } } } };
        const receivedResult = resultsSelector.getResults(fakeStoreState);
        const expectedResult = { samplePopupResults };
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is null)', () => {
        const fakeStoreState = { [reducerKey]: { results: { data: null } } };
        const receivedResult = resultsSelector.getResults(fakeStoreState);
        const expectedResult = [];
        expect(receivedResult).toEqual(expectedResult);
      });

      it('receivedResult should equal to empty object (when data is undefined)', () => {
        const fakeStoreState = { [reducerKey]: { getResults: { data: undefined } } };
        const receivedResult = resultsSelector.getResults(fakeStoreState);
        const expectedResult = [];
        expect(receivedResult).toEqual(expectedResult);
      });
    });
  });
});

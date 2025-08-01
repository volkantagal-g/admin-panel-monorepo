import reducer, { INITIAL_STATE } from '@app/pages/MarketAutoGrowthOperations/redux/reducer';
import { Types } from '@app/pages/MarketAutoGrowthOperations/redux/actions';

describe('Auto Growth', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #setCancelChanges', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_CANCEL_CHANGES });
      const expectedState = {
        promoSetTableData: undefined,
        updateList: { delete: [], update: [], add: [] },
        bucketGroups: [],
      };
      expect(receivedState.promoSetTableData).toEqual(expectedState.promoSetTableData);
      expect(receivedState.updateList).toEqual(expectedState.updateList);
      expect(receivedState.bucketGroups).toEqual(expectedState.bucketGroups);
    });
  });

  describe('reducer #getPromoSetRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_PROMO_SET_REQUEST });
      const expectedState = {
        promoSetTableData: [],
        promoSetBackupData: [],
        bucketGroups: [],
        promoSetTableDataLoading: true,
      };
      expect(receivedState.promoSetTableData).toEqual(expectedState.promoSetTableData);
      expect(receivedState.promoSetBackupData).toEqual(expectedState.promoSetBackupData);
      expect(receivedState.bucketGroups).toEqual(expectedState.bucketGroups);
      expect(receivedState.promoSetTableDataLoading).toEqual(expectedState.promoSetTableDataLoading);
    });
  });

  describe('reducer #getPromoSetFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_PROMO_SET_FAILURE });
      const expectedState = {
        promoSetTableData: [],
        promoSetBackupData: [],
        bucketGroups: [],
        promoSetTableDataLoading: false,
        error: undefined,
      };
      expect(receivedState.promoSetTableData).toEqual(expectedState.promoSetTableData);
      expect(receivedState.promoSetBackupData).toEqual(expectedState.promoSetBackupData);
      expect(receivedState.bucketGroups).toEqual(expectedState.bucketGroups);
      expect(receivedState.promoSetTableDataLoading).toEqual(expectedState.promoSetTableDataLoading);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });
});

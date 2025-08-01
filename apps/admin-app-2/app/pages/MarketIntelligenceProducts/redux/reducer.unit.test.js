import reducer, { INITIAL_STATE } from '@app/pages/MarketIntelligenceProducts/redux/reducer';
import { Types } from '@app/pages/MarketIntelligenceProducts/redux/actions';

describe('Competitor Products', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #getCompetitorListRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COMPETITOR_LIST_REQUEST });
      const expectedState = {
        competitorList: [],
        competitorListLoading: true,
      };
      expect(receivedState.competitorList).toEqual(expectedState.competitorList);
      expect(receivedState.competitorListLoading).toEqual(expectedState.competitorListLoading);
    });
  });

  describe('reducer #getCompetitorListSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COMPETITOR_LIST_SUCCESS });
      const expectedState = { competitorList: undefined, competitorListLoading: false };
      expect(receivedState.competitorList).toEqual(expectedState.competitorList);
      expect(receivedState.competitorListLoading).toEqual(expectedState.competitorListLoading);
    });
  });

  describe('reducer #getCompetitorListFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COMPETITOR_LIST_FAILURE });
      const expectedState = {
        competitorList: [],
        competitorListLoading: false,
        error: undefined,
      };
      expect(receivedState.competitorList).toEqual(expectedState.competitorList);
      expect(receivedState.competitorListLoading).toEqual(expectedState.competitorListLoading);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });

  describe('reducer #postProductMatchDataRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.POST_PRODUCT_MATCH_DATA_REQUEST });
      const expectedState = {
        tableData: [],
        getirCategoryList: [],
        getirSubCategoryList: [],
        competitorCategoryList: [],
        excelExport: {},
        productMatchDataLoading: true,
      };
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.getirCategoryList).toEqual(expectedState.getirCategoryList);
      expect(receivedState.getirSubCategoryList).toEqual(expectedState.getirSubCategoryList);
      expect(receivedState.competitorCategoryList).toEqual(expectedState.competitorCategoryList);
      expect(receivedState.excelExport).toEqual(expectedState.excelExport);
      expect(receivedState.productMatchDataLoading).toEqual(expectedState.productMatchDataLoading);
    });
  });

  describe('reducer #postProductMatchDataFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.POST_PRODUCT_MATCH_DATA_FAILURE });
      const expectedState = {
        tableData: [],
        getirCategoryList: [],
        getirSubCategoryList: [],
        competitorCategoryList: [],
        excelExport: {},
        productMatchDataLoading: false,
        error: undefined,
      };
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.getirCategoryList).toEqual(expectedState.getirCategoryList);
      expect(receivedState.getirSubCategoryList).toEqual(expectedState.getirSubCategoryList);
      expect(receivedState.competitorCategoryList).toEqual(expectedState.competitorCategoryList);
      expect(receivedState.excelExport).toEqual(expectedState.excelExport);
      expect(receivedState.productMatchDataLoading).toEqual(expectedState.productMatchDataLoading);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });
});

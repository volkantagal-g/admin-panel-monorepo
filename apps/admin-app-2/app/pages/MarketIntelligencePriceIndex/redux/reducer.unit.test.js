import reducer, { INITIAL_STATE } from '@app/pages/MarketIntelligencePriceIndex/redux/reducer';
import { Types } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';

describe('Price Index', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #setIndexBy', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_INDEX_BY });
      const expectedState = { indexBy: undefined };
      expect(receivedState.indexBy).toEqual(expectedState.indexBy);
    });
  });

  describe('reducer #setInitialTable', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_INITIAL_TABLE });
      const expectedState = {
        isLoading: undefined,
        tableData: [],
        tableOverall: {},
        excelExportCategory: {},
      };
      expect(receivedState.isLoading).toEqual(expectedState.isLoading);
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.tableOverall).toEqual(expectedState.tableOverall);
      expect(receivedState.excelExportCategory).toEqual(expectedState.excelExportCategory);
    });
  });

  describe('reducer #getCategoriesRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CATEGORIES_REQUEST });
      const expectedState = {
        categoryList: undefined,
        isLoadingFilter: true,
      };
      expect(receivedState.categoryList).toEqual(expectedState.categoryList);
      expect(receivedState.isLoadingFilter).toEqual(expectedState.isLoadingFilter);
    });
  });

  describe('reducer #getCategoriesSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CATEGORIES_SUCCESS });
      const expectedState = { categoryList: undefined };
      expect(receivedState.categoryList).toEqual(expectedState.categoryList);
    });
  });

  describe('reducer #getCategoriesFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CATEGORIES_FAILURE });
      const expectedState = {
        categoryList: undefined,
        isLoadingFilter: false,
        error: undefined,
      };
      expect(receivedState.categoryList).toEqual(expectedState.categoryList);
      expect(receivedState.isLoadingFilter).toEqual(expectedState.isLoadingFilter);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });

  describe('reducer #getSubCategoriesRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_SUB_CATEGORIES_REQUEST });
      const expectedState = {
        subCategoryList: undefined,
        isLoadingFilter: true,
      };
      expect(receivedState.subCategoryList).toEqual(expectedState.subCategoryList);
      expect(receivedState.isLoadingFilter).toEqual(expectedState.isLoadingFilter);
    });
  });

  describe('reducer #getSubCategoriesFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_SUB_CATEGORIES_FAILURE });
      const expectedState = {
        subCategoryList: undefined,
        isLoadingFilter: false,
        error: undefined,
      };
      expect(receivedState.subCategoryList).toEqual(expectedState.subCategoryList);
      expect(receivedState.isLoadingFilter).toEqual(expectedState.isLoadingFilter);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });
});

import reducer, { INITIAL_STATE } from '@app/pages/MarketIntelligencePriceRecommendation/redux/reducer';
import { Types } from '@app/pages/MarketIntelligencePriceRecommendation/redux/actions';

describe('Price Recommendation Redux Reducer Testing', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #setSubcategoryPercentage', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.SET_SUBCATEGORY_PERCENTAGE },
      );
      const expectedState = { subcategoryPercentage: undefined };
      expect(receivedState.subcategoryPercentage).toEqual(
        expectedState.subcategoryPercentage,
      );
    });
  });

  describe('reducer #setPriceType', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_PRICE_TYPE });
      const expectedState = { priceType: undefined };
      expect(receivedState.priceType).toEqual(
        expectedState.priceType,
      );
    });
  });

  describe('reducer #setClearFilteredData', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.SET_CLEAR_FILTERED_DATA },
      );
      const expectedState = {
        tableData: undefined,
        filteredTableData: undefined,
      };
      expect(receivedState.filteredTableData).toEqual(
        expectedState.filteredTableData,
      );
      expect(receivedState.tableData).toEqual(expectedState.tableData);
    });
  });

  describe('reducer #getRecommendationDataRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_RECOMMENDATION_DATA_REQUEST },
      );
      const expectedState = {
        tableData: [],
        tableDataBackup: [],
        filteredTableData: [],
        excelExportDataTitles: [],
        excelExportDataColumns: [],
        manufacturerList: [],
        brandList: [],
        supplierList: [],
        categoryRoleList: [],
        globalCategoryList: [],
        categoryPlanningList: [],
        kviList: [],
        productList: [],
        manufacturerListBackup: [],
        brandListBackup: [],
        supplierListBackup: [],
        categoryRoleListBackup: [],
        globalCategoryListBackup: [],
        categoryPlanningListBackup: [],
        kviListBackup: [],
        productListBackup: [],
        subcategoryPercentage: 0,
        isSuccessCall: null,
        loading: true,
      };
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.tableDataBackup).toEqual(expectedState.tableDataBackup);
      expect(receivedState.filteredTableData).toEqual(expectedState.filteredTableData);
      expect(receivedState.excelExportDataTitles).toEqual(expectedState.excelExportDataTitles);
      expect(receivedState.excelExportDataColumns).toEqual(expectedState.excelExportDataColumns);
      expect(receivedState.manufacturerList).toEqual(expectedState.manufacturerList);
      expect(receivedState.brandList).toEqual(expectedState.brandList);
      expect(receivedState.supplierList).toEqual(expectedState.supplierList);
      expect(receivedState.categoryRoleList).toEqual(expectedState.categoryRoleList);
      expect(receivedState.globalCategoryList).toEqual(expectedState.globalCategoryList);
      expect(receivedState.categoryPlanningList).toEqual(expectedState.categoryPlanningList);
      expect(receivedState.kviList).toEqual(expectedState.kviList);
      expect(receivedState.productList).toEqual(expectedState.productList);
      expect(receivedState.manufacturerListBackup).toEqual(expectedState.manufacturerListBackup);
      expect(receivedState.brandListBackup).toEqual(expectedState.brandListBackup);
      expect(receivedState.supplierListBackup).toEqual(expectedState.supplierListBackup);
      expect(receivedState.categoryRoleListBackup).toEqual(expectedState.categoryRoleListBackup);
      expect(receivedState.globalCategoryListBackup).toEqual(expectedState.globalCategoryListBackup);
      expect(receivedState.categoryPlanningListBackup).toEqual(expectedState.categoryPlanningListBackup);
      expect(receivedState.kviListBackup).toEqual(expectedState.kviListBackup);
      expect(receivedState.productListBackup).toEqual(expectedState.productListBackup);
      expect(receivedState.subcategoryPercentage).toEqual(expectedState.subcategoryPercentage);
      expect(receivedState.isSuccessCall).toEqual(expectedState.isSuccessCall);
      expect(receivedState.loading).toEqual(expectedState.loading);
    });
  });

  describe('reducer #getRecommendationDataFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_RECOMMENDATION_DATA_FAILURE },
      );

      const expectedState = {
        tableData: [],
        tableDataBackup: [],
        filteredTableData: [],
        excelExportDataTitles: [],
        excelExportDataColumns: [],
        manufacturerList: [],
        brandList: [],
        supplierList: [],
        categoryRoleList: [],
        globalCategoryList: [],
        categoryPlanningList: [],
        kviList: [],
        productList: [],
        manufacturerListBackup: [],
        brandListBackup: [],
        supplierListBackup: [],
        categoryRoleListBackup: [],
        globalCategoryListBackup: [],
        categoryPlanningListBackup: [],
        kviListBackup: [],
        productListBackup: [],
        isSuccessCall: false,
        loading: false,
        error: undefined,
      };
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.tableDataBackup).toEqual(expectedState.tableDataBackup);
      expect(receivedState.filteredTableData).toEqual(expectedState.filteredTableData);
      expect(receivedState.excelExportDataTitles).toEqual(expectedState.excelExportDataTitles);
      expect(receivedState.excelExportDataColumns).toEqual(expectedState.excelExportDataColumns);
      expect(receivedState.manufacturerList).toEqual(expectedState.manufacturerList);
      expect(receivedState.brandList).toEqual(expectedState.brandList);
      expect(receivedState.supplierList).toEqual(expectedState.supplierList);
      expect(receivedState.categoryRoleList).toEqual(expectedState.categoryRoleList);
      expect(receivedState.globalCategoryList).toEqual(expectedState.globalCategoryList);
      expect(receivedState.categoryPlanningList).toEqual(expectedState.categoryPlanningList);
      expect(receivedState.kviList).toEqual(expectedState.kviList);
      expect(receivedState.productList).toEqual(expectedState.productList);
      expect(receivedState.manufacturerListBackup).toEqual(expectedState.manufacturerListBackup);
      expect(receivedState.brandListBackup).toEqual(expectedState.brandListBackup);
      expect(receivedState.supplierListBackup).toEqual(expectedState.supplierListBackup);
      expect(receivedState.categoryRoleListBackup).toEqual(expectedState.categoryRoleListBackup);
      expect(receivedState.globalCategoryListBackup).toEqual(expectedState.globalCategoryListBackup);
      expect(receivedState.categoryPlanningListBackup).toEqual(expectedState.categoryPlanningListBackup);
      expect(receivedState.kviListBackup).toEqual(expectedState.kviListBackup);
      expect(receivedState.productListBackup).toEqual(expectedState.productListBackup);
      expect(receivedState.loading).toEqual(expectedState.loading);
      expect(receivedState.isSuccessCall).toEqual(expectedState.isSuccessCall);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });

  describe('reducer #getSimulateIndexRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_SIMULATE_INDEX_REQUEST },
      );
      const expectedState = {
        simulateData: [],
        historicUpdateList: undefined,
        simulateDataLoading: true,
      };
      expect(receivedState.simulateData).toEqual(
        expectedState.simulateData,
      );
      expect(receivedState.historicUpdateList).toEqual(
        expectedState.historicUpdateList,
      );
      expect(receivedState.simulateDataLoading).toEqual(
        expectedState.simulateDataLoading,
      );
    });
  });

  describe('reducer #getSimulateIndexSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_SIMULATE_INDEX_SUCCESS },
      );
      const expectedState = {
        simulateData: undefined,
        simulateDataLoading: false,
      };
      expect(receivedState.simulateData).toEqual(
        expectedState.simulateData,
      );
      expect(receivedState.simulateDataLoading).toEqual(
        expectedState.simulateDataLoading,
      );
    });
  });

  describe('reducer #getSimulateIndexFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_SIMULATE_INDEX_FAILURE },
      );
      const expectedState = {
        simulateData: [],
        simulateDataLoading: false,
        error: undefined,
      };
      expect(receivedState.simulateData).toEqual(
        expectedState.simulateData,
      );
      expect(receivedState.simulateDataLoading).toEqual(
        expectedState.simulateDataLoading,
      );
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });

  describe('reducer #getCompetitorListRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_COMPETITOR_LIST_REQUEST },
      );
      const expectedState = {
        competitorList: [],
        isLoadingCompetitorFilter: true,
      };
      expect(receivedState.competitorList).toEqual(
        expectedState.competitorList,
      );
      expect(receivedState.isLoadingCompetitorFilter).toEqual(
        expectedState.isLoadingCompetitorFilter,
      );
    });
  });

  describe('reducer #getCompetitorListSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_COMPETITOR_LIST_SUCCESS },
      );
      const expectedState = {
        competitorList: undefined,
        isLoadingCompetitorFilter: false,
      };
      expect(receivedState.competitorList).toEqual(
        expectedState.competitorList,
      );
      expect(receivedState.isLoadingCompetitorFilter).toEqual(
        expectedState.isLoadingCompetitorFilter,
      );
    });
  });

  describe('reducer #getCompetitorListFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_COMPETITOR_LIST_FAILURE },
      );
      const expectedState = {
        competitorList: [],
        isLoadingCompetitorFilter: false,
        error: undefined,
      };
      expect(receivedState.competitorList).toEqual(
        expectedState.competitorList,
      );
      expect(receivedState.isLoadingCompetitorFilter).toEqual(
        expectedState.isLoadingCompetitorFilter,
      );
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });
  describe('reducer #getPricingRulesDataRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_PRICING_RULES_DATA_REQUEST },
      );
      const expectedState = {
        ruleData: {},
        guardrailData: {},
        isLoadingPricingRules: true,
      };
      expect(receivedState.ruleData).toEqual(
        expectedState.ruleData,
      );
      expect(receivedState.guardrailData).toEqual(
        expectedState.guardrailData,
      );
      expect(receivedState.isLoadingPricingRules).toEqual(
        expectedState.isLoadingPricingRules,
      );
    });
  });

  describe('reducer #getPricingRulesDataSuccess', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_PRICING_RULES_DATA_SUCCESS },
      );
      const expectedState = {
        ruleData: undefined,
        guardrailData: undefined,
        isLoadingPricingRules: false,
      };
      expect(receivedState.ruleData).toEqual(
        expectedState.ruleData,
      );
      expect(receivedState.guardrailData).toEqual(
        expectedState.guardrailData,
      );
      expect(receivedState.isLoadingPricingRules).toEqual(
        expectedState.isLoadingPricingRules,
      );
    });
  });

  describe('reducer #getPricingRulesDataFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_PRICING_RULES_DATA_FAILURE },
      );
      const expectedState = {
        ruleData: {},
        guardrailData: {},
        isLoadingPricingRules: false,
        error: undefined,
      };
      expect(receivedState.ruleData).toEqual(
        expectedState.ruleData,
      );
      expect(receivedState.guardrailData).toEqual(
        expectedState.guardrailData,
      );
      expect(receivedState.isLoadingPricingRules).toEqual(
        expectedState.isLoadingPricingRules,
      );
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });
});

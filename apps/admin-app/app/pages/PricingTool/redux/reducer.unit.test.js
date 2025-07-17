import reducer, { INITIAL_STATE } from '@app/pages/PricingTool/redux/reducer';
import { Types } from '@app/pages/PricingTool/redux/actions';

describe('PricingTool', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer #setSubcategoryPercentage', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_SUBCATEGORY_PERCENTAGE });
      const expectedState = { subcategoryPercentage: undefined };
      expect(receivedState.subcategoryPercentage).toEqual(expectedState.subcategoryPercentage);
    });
  });

  describe('reducer #setPriceType', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_PRICE_TYPE });
      const expectedState = { priceType: undefined };
      expect(receivedState.priceType).toEqual(expectedState.priceType);
    });
  });

  describe('reducer #setShowAandM', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_SHOW_AAND_M });
      const expectedState = { showAandM: undefined };
      expect(receivedState.showAandM).toEqual(expectedState.showAandM);
    });
  });

  describe('reducer #getElasticityDataRequest', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_PRICING_TOOL_DATA_REQUEST });
      const expectedState = {
        backupData: undefined,
        filteredTableData: undefined,
        competitorList: undefined,
        tableData: undefined,
        manufacturerList: undefined,
        brandList: undefined,
        supplierList: undefined,
        categoryList: undefined,
        subcategoryList: undefined,
        productList: undefined,
        isSuccessCall: undefined,
        loading: undefined,
      };
      expect(receivedState.backupData).toEqual(expectedState.backupData);
      expect(receivedState.filteredTableData).toEqual(expectedState.filteredTableData);
      expect(receivedState.competitorList).toEqual(expectedState.competitorList);
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.manufacturerList).toEqual(expectedState.manufacturerList);
      expect(receivedState.brandList).toEqual(expectedState.brandList);
      expect(receivedState.supplierList).toEqual(expectedState.supplierList);
      expect(receivedState.categoryList).toEqual(expectedState.categoryList);
      expect(receivedState.subcategoryList).toEqual(expectedState.subcategoryList);
      expect(receivedState.productList).toEqual(expectedState.productList);
      expect(receivedState.isSuccessCall).toEqual(expectedState.isSuccessCall);
      expect(receivedState.loading).toEqual(expectedState.loading);
    });
  });

  describe('reducer #getElasticityDataFailure', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_PRICING_TOOL_DATA_FAILURE });
      const expectedState = {
        backupData: undefined,
        filteredTableData: undefined,
        competitorList: undefined,
        tableData: undefined,
        manufacturerList: undefined,
        brandList: undefined,
        supplierList: undefined,
        categoryList: undefined,
        subcategoryList: undefined,
        productList: undefined,
        isSuccessCall: undefined,
        loading: undefined,
        error: undefined,
      };
      expect(receivedState.backupData).toEqual(expectedState.backupData);
      expect(receivedState.filteredTableData).toEqual(expectedState.filteredTableData);
      expect(receivedState.competitorList).toEqual(expectedState.competitorList);
      expect(receivedState.tableData).toEqual(expectedState.tableData);
      expect(receivedState.manufacturerList).toEqual(expectedState.manufacturerList);
      expect(receivedState.brandList).toEqual(expectedState.brandList);
      expect(receivedState.supplierList).toEqual(expectedState.supplierList);
      expect(receivedState.categoryList).toEqual(expectedState.categoryList);
      expect(receivedState.subcategoryList).toEqual(expectedState.subcategoryList);
      expect(receivedState.productList).toEqual(expectedState.productList);
      expect(receivedState.isSuccessCall).toEqual(expectedState.isSuccessCall);
      expect(receivedState.loading).toEqual(expectedState.loading);
      expect(receivedState.error).toEqual(expectedState.error);
    });
  });
});

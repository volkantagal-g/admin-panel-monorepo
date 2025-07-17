import {
  Creators,
  Types,
} from '@app/pages/MarketIntelligencePriceRecommendation/redux/actions';

describe('Price Recommendation Redux Action Testing', () => {
  describe('action-creator #setFilteredTableData', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setFilteredTableData();
      const expectedAction = { type: Types.SET_FILTERED_TABLE_DATA, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #setSubcategoryPercentage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setSubcategoryPercentage();
      const expectedAction = {
        type: Types.SET_SUBCATEGORY_PERCENTAGE,
        data: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setPriceType', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setPriceType();
      const expectedAction = { type: Types.SET_PRICE_TYPE, data: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setFilterList', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setFilterList();
      const expectedAction = {
        type: Types.SET_FILTER_LIST,
        filters: null,
        hasFilter: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setUpdateList', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setUpdateList();
      const expectedAction = { type: Types.SET_UPDATE_LIST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setExcelData', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setExcelData();
      const expectedAction = {
        type: Types.SET_EXCEL_DATA,
        data: null,
        bundleData: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setClearFilteredData', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setClearFilteredData();
      const expectedAction = { type: Types.SET_CLEAR_FILTERED_DATA };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getRecommendationDataRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getRecommendationDataRequest();
      const expectedAction = {
        type: Types.GET_RECOMMENDATION_DATA_REQUEST,
        domainType: null,
        data: {},
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getRecommendationDataSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getRecommendationDataSuccess();
      const expectedAction = {
        type: Types.GET_RECOMMENDATION_DATA_SUCCESS,
        data: [],
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getRecommendationDataFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getRecommendationDataFailure();
      const expectedAction = {
        type: Types.GET_RECOMMENDATION_DATA_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getSimulateIndexRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSimulateIndexRequest();
      const expectedAction = {
        type: Types.GET_SIMULATE_INDEX_REQUEST,
        productList: [],
        competitorList: [],
        domainType: null,
        baseCompetitor: null,
        indexType: null,
        priorityList: [],
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getSimulateIndexSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSimulateIndexSuccess();
      const expectedAction = {
        type: Types.GET_SIMULATE_INDEX_SUCCESS,
        data: [],
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getSimulateIndexFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSimulateIndexFailure();
      const expectedAction = {
        type: Types.GET_SIMULATE_INDEX_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCompetitorListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCompetitorListRequest();
      const expectedAction = {
        type: Types.GET_COMPETITOR_LIST_REQUEST,
        domainType: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getCompetitorListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCompetitorListSuccess();
      const expectedAction = {
        type: Types.GET_COMPETITOR_LIST_SUCCESS,
        competitorList: [],
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCompetitorListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCompetitorListFailure();
      const expectedAction = {
        type: Types.GET_COMPETITOR_LIST_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPricingRulesDataRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPricingRulesDataRequest();
      const expectedAction = {
        type: Types.GET_PRICING_RULES_DATA_REQUEST,
        domainType: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getPricingRulesDataSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPricingRulesDataSuccess();
      const expectedAction = { type: Types.GET_PRICING_RULES_DATA_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPricingRulesDataFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPricingRulesDataFailure();
      const expectedAction = {
        type: Types.GET_PRICING_RULES_DATA_FAILURE,
        error: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});

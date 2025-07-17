import { Creators, Types } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';

describe('PriceIndex', () => {
  describe('action-creator #setIndexBy', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setIndexBy();
      const expectedAction = { type: Types.SET_INDEX_BY, data: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #setInitialTable', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setInitialTable();
      const expectedAction = { type: Types.SET_INITIAL_TABLE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCompetitorList', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setCompetitorList();
      const expectedAction = { type: Types.SET_COMPETITOR_LIST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCategoriesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCategoriesRequest();
      const expectedAction = { type: Types.GET_CATEGORIES_REQUEST, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCategoriesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCategoriesSuccess();
      const expectedAction = { type: Types.GET_CATEGORIES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getCategoriesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCategoriesFailure();
      const expectedAction = { type: Types.GET_CATEGORIES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getSubCategoriesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSubCategoriesRequest();
      const expectedAction = { type: Types.GET_SUB_CATEGORIES_REQUEST, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getSubCategoriesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSubCategoriesSuccess();
      const expectedAction = { type: Types.GET_SUB_CATEGORIES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getSubCategoriesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getSubCategoriesFailure();
      const expectedAction = { type: Types.GET_SUB_CATEGORIES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #fetchCompetitorListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.fetchCompetitorListRequest();
      const expectedAction = { type: Types.FETCH_COMPETITOR_LIST_REQUEST, afterSuccess: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #fetchCompetitorListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.fetchCompetitorListSuccess();
      const expectedAction = { type: Types.FETCH_COMPETITOR_LIST_SUCCESS, competitorList: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #fetchCompetitorListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.fetchCompetitorListFailure();
      const expectedAction = { type: Types.FETCH_COMPETITOR_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #postIndexByDataRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.postIndexByDataRequest();
      const expectedAction = { type: Types.POST_INDEX_BY_DATA_REQUEST, fetchData: {}, indexBy: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #postIndexByDataSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.postIndexByDataSuccess();
      const expectedAction = { type: Types.POST_INDEX_BY_DATA_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #postIndexByDataFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.postIndexByDataFailure();
      const expectedAction = { type: Types.POST_INDEX_BY_DATA_FAILURE, error: null };
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

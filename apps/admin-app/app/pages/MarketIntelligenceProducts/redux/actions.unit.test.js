import { Creators, Types } from '@app/pages/MarketIntelligenceProducts/redux/actions';

describe('Competition Products', () => {
  describe('action-creator #getCompetitorListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCompetitorListRequest();
      const expectedAction = { type: Types.GET_COMPETITOR_LIST_REQUEST, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCompetitorListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCompetitorListSuccess();
      const expectedAction = { type: Types.GET_COMPETITOR_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getCompetitorListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCompetitorListFailure();
      const expectedAction = { type: Types.GET_COMPETITOR_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #postProductMatchDataRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.postProductMatchDataRequest();
      const expectedAction = { type: Types.POST_PRODUCT_MATCH_DATA_REQUEST, crawlDate: '', competitorName: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #postProductMatchDataSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.postProductMatchDataSuccess();
      const expectedAction = { type: Types.POST_PRODUCT_MATCH_DATA_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #postProductMatchDataFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.postProductMatchDataFailure();
      const expectedAction = { type: Types.POST_PRODUCT_MATCH_DATA_FAILURE, error: null };
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

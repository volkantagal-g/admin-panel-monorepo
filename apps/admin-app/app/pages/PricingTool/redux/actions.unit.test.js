import { Creators, Types } from '@app/pages/PricingTool/redux/actions';

describe('PricingTool', () => {
  describe('action-creator #setFilteredTableData', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setFilteredTableData();
      const expectedAction = { type: Types.SET_FILTERED_TABLE_DATA, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #setSubcategoryPercentage', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setSubcategoryPercentage();
      const expectedAction = { type: Types.SET_SUBCATEGORY_PERCENTAGE, data: null };
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

  describe('action-creator #getElasticityDataRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getElasticityDataRequest();
      const expectedAction = { type: Types.GET_ELASTICITY_DATA_REQUEST, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getElasticityDataSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getElasticityDataSuccess();
      const expectedAction = { type: Types.GET_ELASTICITY_DATA_SUCCESS, data: [], showAandM: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getElasticityDataFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getElasticityDataFailure();
      const expectedAction = { type: Types.GET_ELASTICITY_DATA_FAILURE, error: null };
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

/* eslint-disable */
import { Creators, Types } from '@app/pages/OnOffPromoConfig/redux/actions';

describe('OnOffPromoConfig', () => {
  describe('action-creator #setSelectedCityFilter', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setSelectedCityFilter();
      const expectedAction = { type: Types.SET_SELECTED_CITY_FILTER, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #setSelectedWarehouse', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setSelectedWarehouse();
      const expectedAction = { type: Types.SET_SELECTED_WAREHOUSE, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setChangedConfig', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.setChangedConfig();
      const expectedAction = { type: Types.SET_CHANGED_CONFIG, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  
  describe('action-creator #getOnOffResultRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getOnOffResultRequest();
      const expectedAction = { type: Types.GET_ON_OFF_RESULT_REQUEST, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getOnOffResultSuccess', () => {
    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getOnOffResultSuccess();
      const expectedAction = { type: Types.GET_ON_OFF_RESULT_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getOnOffResultFailure', () => {
    it('should ignore extra args', () => {
      const receivedAction = Creators.getOnOffResultFailure();
      const expectedAction = { type: Types.GET_ON_OFF_RESULT_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
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

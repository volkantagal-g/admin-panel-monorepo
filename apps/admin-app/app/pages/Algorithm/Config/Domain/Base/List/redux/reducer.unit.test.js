import reducer, { INITIAL_STATE } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/reducer';

import { Types } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/actions';

describe('Algorithm/Domain/Config/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_REQUEST });
      const expectedState = { algorithmDomainConfigList: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_SUCCESS, data: [{ alias: 'config' }] });
      const expectedState = {
        algorithmDomainConfigList: {
          isPending: false,
          data: [{ alias: 'config' }],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_FAILURE });
      const expectedState = { algorithmDomainConfigList: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST });
      const expectedState = { algorithmDomainSettings: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_SETTINGS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_SETTINGS_SUCCESS, data: [{ alias: 'config' }] });
      const expectedState = {
        algorithmDomainSettings: {
          isPending: false,
          data: [{ alias: 'config' }],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_SETTINGS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_SETTINGS_FAILURE });
      const expectedState = { algorithmDomainSettings: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer ADD_FILTER_PARAMETER', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.ADD_FILTER_PARAMETER, field: 'key', value: '123', operator: 'exact' });
      const expectedState = { filters: { key: { field: 'key', value: '123', operator: 'exact' } } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_NAMESPACE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_NAMESPACE, namespace: 'market' });
      const expectedState = { namespace: 'market' };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_CONSTANTS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_CONSTANTS, constants: { fields: ['name'] } });
      const expectedState = { constants: { fields: ['name'] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});

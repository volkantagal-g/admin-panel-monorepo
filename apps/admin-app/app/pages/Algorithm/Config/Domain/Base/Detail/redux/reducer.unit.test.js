import reducer, { INITIAL_STATE } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/reducer';

import { Types } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/actions';

describe('Algorithm/Domain/Config/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_REQUEST });
      const expectedState = { algorithmDomainConfigDetail: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        algorithmDomainConfigDetail: {
          isPending: false,
          data: { alias: 'config' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_FAILURE });
      const expectedState = { algorithmDomainConfigDetail: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST });
      const expectedState = { algorithmDomainConfigValue: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_VALUE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        algorithmDomainConfigValue: {
          isPending: false,
          data: { alias: 'config' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_DOMAIN_CONFIG_VALUE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_FAILURE });
      const expectedState = { algorithmDomainConfigValue: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST });
      const expectedState = { isUpdating: true };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        isUpdating: false,
        algorithmDomainConfigDetail: { data: { alias: 'config' } },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_FAILURE });
      const expectedState = { isUpdating: false };
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
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_DOMAIN_SETTINGS_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        algorithmDomainSettings: {
          isPending: false,
          data: { alias: 'config' },
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

  describe('reducer GET_WAREHOUSE_DETAIL_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WAREHOUSE_DETAIL_REQUEST });
      const expectedState = { warehouseData: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_WAREHOUSE_DETAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WAREHOUSE_DETAIL_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        warehouseData: {
          isPending: false,
          data: { alias: 'config' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_WAREHOUSE_DETAIL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_WAREHOUSE_DETAIL_FAILURE });
      const expectedState = { warehouseData: { isPending: false } };
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

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});

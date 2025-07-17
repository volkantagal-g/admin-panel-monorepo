import reducer, { INITIAL_STATE } from '@app/pages/Algorithm/Config/Detail/redux/reducer';

import { Types } from '@app/pages/Algorithm/Config/Detail/redux/actions';

describe('Algorithm/Config/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer SEARCH_CUSTOM_CONFIG_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_DETAIL_REQUEST });
      const expectedState = { configDetail: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_DETAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_DETAIL_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        configDetail: {
          isPending: false,
          data: { alias: 'config' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_DETAIL_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_DETAIL_FAILURE });
      const expectedState = { configDetail: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_VALUE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_VALUE_REQUEST });
      const expectedState = { configValue: { isPending: true, data: {} } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_VALUE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_VALUE_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        configValue: {
          isPending: false,
          data: { alias: 'config' },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_VALUE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_VALUE_FAILURE });
      const expectedState = { configValue: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_CONFIG_VALUE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_CONFIG_VALUE_REQUEST });
      const expectedState = { configUpdating: true };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_CONFIG_VALUE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_CONFIG_VALUE_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        configUpdating: false,
        configDetail: { data: { alias: 'config' } },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_CONFIG_VALUE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_CONFIG_VALUE_FAILURE });
      const expectedState = { configUpdating: false };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DELETE_CONFIG_NODE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DELETE_CONFIG_NODE_REQUEST });
      const expectedState = { configDeleting: true };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DELETE_CONFIG_NODE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DELETE_CONFIG_NODE_SUCCESS, data: { alias: 'config' } });
      const expectedState = { configDeleting: false, configDeleteStatus: { alias: 'config' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DELETE_CONFIG_NODE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DELETE_CONFIG_NODE_FAILURE });
      const expectedState = { configDeleting: false };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer LINK_CUSTOM_CONFIG_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.LINK_CUSTOM_CONFIG_REQUEST });
      const expectedState = { configLinking: true, customConfigList: { data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer LINK_CUSTOM_CONFIG_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.LINK_CUSTOM_CONFIG_SUCCESS, data: { alias: 'config' } });
      const expectedState = { configLinking: false, configDetail: { data: { alias: 'config' } } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer LINK_CUSTOM_CONFIG_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.LINK_CUSTOM_CONFIG_FAILURE });
      const expectedState = { configLinking: false };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UNLINK_CUSTOM_CONFIG_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UNLINK_CUSTOM_CONFIG_REQUEST });
      const expectedState = { configUnlinking: true };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UNLINK_CUSTOM_CONFIG_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UNLINK_CUSTOM_CONFIG_SUCCESS, data: { alias: 'config' } });
      const expectedState = { configUnlinking: false };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UNLINK_CUSTOM_CONFIG_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.UNLINK_CUSTOM_CONFIG_FAILURE });
      const expectedState = { configUnlinking: false };
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
  describe('reducer SEARCH_CUSTOM_CONFIG_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEARCH_CUSTOM_CONFIG_REQUEST });
      const expectedState = {
        customConfigList: {
          data: [],
          isPending: true,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEARCH_CUSTOM_CONFIG_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEARCH_CUSTOM_CONFIG_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        customConfigList: {
          data: { alias: 'config' },
          isPending: false,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEARCH_CUSTOM_CONFIG_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEARCH_CUSTOM_CONFIG_FAILURE });
      const expectedState = { customConfigList: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_SCHEMA_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_SCHEMA_REQUEST });
      const expectedState = {
        configSchema: {
          data: {},
          isPending: true,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_SCHEMA_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_SCHEMA_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        configSchema: {
          data: { alias: 'config' },
          isPending: false,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CONFIG_SCHEMA_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CONFIG_SCHEMA_FAILURE });
      const expectedState = { configSchema: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer VALIDATE_CONFIG_VALUE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.VALIDATE_CONFIG_VALUE_REQUEST });
      const expectedState = {
        validateConfigValue: {
          data: {},
          isPending: true,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer VALIDATE_CONFIG_VALUE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.VALIDATE_CONFIG_VALUE_SUCCESS, data: { alias: 'config' } });
      const expectedState = {
        validateConfigValue: {
          data: { alias: 'config' },
          isPending: false,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer VALIDATE_CONFIG_VALUE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.VALIDATE_CONFIG_VALUE_FAILURE });
      const expectedState = { validateConfigValue: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});

import reducer, { INITIAL_STATE } from '@app/pages/Algorithm/Config/List/redux/reducer';

import { Types } from '@app/pages/Algorithm/Config/List/redux/actions';

describe('Algorithm/Config/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_ALGORITHM_CONFIG_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_LIST_REQUEST });
      const expectedState = { algorithmConfigList: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_LIST_SUCCESS, data: [{ alias: 'config' }] });
      const expectedState = {
        algorithmConfigList: {
          isPending: false,
          data: [{ alias: 'config' }],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_LIST_FAILURE });
      const expectedState = { algorithmConfigList: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_NAMESPACE_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_REQUEST });
      const expectedState = { namespaceList: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_NAMESPACE_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_SUCCESS, data: ['general', 'core'] });
      const expectedState = {
        namespaceList: {
          isPending: false,
          data: ['general', 'core'],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_NAMESPACE_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_FAILURE });
      const expectedState = { namespaceList: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_TYPE_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_TYPE_LIST_REQUEST });
      const expectedState = { typeList: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_TYPE_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_TYPE_LIST_SUCCESS, data: ['global', 'city', 'country'] });
      const expectedState = {
        typeList: {
          isPending: false,
          data: ['global', 'city', 'country'],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALGORITHM_CONFIG_TYPE_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ALGORITHM_CONFIG_TYPE_LIST_FAILURE });
      const expectedState = { typeList: { isPending: false } };
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

  describe('reducer CLEAR_TYPE_FILTER', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({
        filters: {
          type: { field: 'type', value: '123', operator: 'exact' },
          alias: { field: 'alias', value: 'abc', operator: 'exact' },
        },
      }, { type: Types.CLEAR_TYPE_FILTER });
      const expectedState = { filters: { alias: { field: 'alias', value: 'abc', operator: 'exact' } } };
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

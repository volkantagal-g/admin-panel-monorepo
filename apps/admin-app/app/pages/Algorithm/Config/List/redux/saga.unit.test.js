import { testSaga } from 'redux-saga-test-plan';

import {
  getAlgorithmConfigList,
  getAlgorithmConfigTypeList,
  getAlgorithmConfigNamespaceList,
  watchGetAlgorithmConfigListRequest,
  watchGetAlgorithmConfigNamespaceListRequest,
  watchGetAlgorithmConfigTypeListRequest,
} from '@app/pages/Algorithm/Config/List/redux/saga';
import { Creators, Types } from '@app/pages/Algorithm/Config/List/redux/actions';
import { getConfigList, getNamespaceList, getTypeList } from '@shared/api/algorithm/config';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('AlgorithmConfigList', () => {
  describe('saga #getAlgorithmConfigList', () => {
    const fakeRequestData = {
      namespace: 'market',
      page: 2,
      pageSize: 10,
      filters: [],
    };
    const fakeResponseData = [{ alias: 'config' }];

    it('should call the getAlgorithmConfigList (success)', () => {
      testSaga(getAlgorithmConfigList, fakeRequestData)
        .next()
        .call(getConfigList, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmConfigListSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmConfigList (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmConfigList, fakeRequestData)
        .next()
        .call(getConfigList, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmConfigListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getAlgorithmConfigNamespaceList', () => {
    const fakeResponseData = [
      'general',
      'core',
      'market',
    ];

    it('should call the getAlgorithmConfigNamespaceList (success)', () => {
      testSaga(getAlgorithmConfigNamespaceList)
        .next()
        .call(getNamespaceList)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmConfigNamespaceListSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmConfigNamespaceList (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmConfigNamespaceList)
        .next()
        .call(getNamespaceList)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmConfigNamespaceListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getAlgorithmConfigTypeList', () => {
    const fakeRequestData = { namespace: 'market' };
    const fakeResponseData = [
      'global',
      'country',
      'city',
      'region',
    ];

    it('should call the getAlgorithmConfigTypeList (success)', () => {
      testSaga(getAlgorithmConfigTypeList, fakeRequestData)
        .next()
        .call(getTypeList, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmConfigTypeListSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmConfigTypeList (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmConfigTypeList, fakeRequestData)
        .next()
        .call(getTypeList, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmConfigTypeListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmConfigListRequest', () => {
    it('should call the watchGetAlgorithmConfigListRequest', () => {
      testSaga(watchGetAlgorithmConfigListRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_CONFIG_LIST_REQUEST, getAlgorithmConfigList)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmConfigNamespaceListRequest', () => {
    it('should call the watchGetAlgorithmConfigNamespaceListRequest', () => {
      testSaga(watchGetAlgorithmConfigNamespaceListRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_REQUEST, getAlgorithmConfigNamespaceList)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmConfigTypeListRequest', () => {
    it('should call the watchGetAlgorithmConfigTypeListRequest', () => {
      testSaga(watchGetAlgorithmConfigTypeListRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_CONFIG_TYPE_LIST_REQUEST, getAlgorithmConfigTypeList)
        .next()
        .isDone();
    });
  });
});

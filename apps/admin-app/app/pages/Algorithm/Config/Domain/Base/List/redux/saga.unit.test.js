import { testSaga } from 'redux-saga-test-plan';

import {
  getAlgorithmDomainConfigList,
  watchGetAlgorithmDomainConfigListRequest,
} from '@app/pages/Algorithm/Config/Domain/Base/List/redux/saga';
import { Creators, Types } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/actions';
import { algorithmDomainConfigListSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';
import { getConfigList } from '@shared/api/algorithm/config';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('AlgorithmDomainConfigList', () => {
  describe('saga #getAlgorithmDomainConfigList', () => {
    const fakeRequestData = {
      namespace: 'food',
      page: 1,
      pageSize: 5,
      filters: [],
    };
    const fakeResponseData = [{ alias: 'config_value' }];

    it('should call the getAlgorithmDomainConfigList (success)', () => {
      testSaga(getAlgorithmDomainConfigList, fakeRequestData)
        .next()
        .select(algorithmDomainConfigListSelector.getNamespace)
        .next('food')
        .call(getConfigList, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getAlgorithmDomainConfigListSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getAlgorithmDomainConfigList (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAlgorithmDomainConfigList, fakeRequestData)
        .next()
        .select(algorithmDomainConfigListSelector.getNamespace)
        .next('food')
        .call(getConfigList, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAlgorithmDomainConfigListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetAlgorithmDomainConfigListRequest', () => {
    it('should call the watchGetAlgorithmConfigListRequest', () => {
      testSaga(watchGetAlgorithmDomainConfigListRequest)
        .next()
        .takeLatest(Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_REQUEST, getAlgorithmDomainConfigList)
        .next()
        .isDone();
    });
  });
});

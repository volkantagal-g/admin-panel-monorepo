import { testSaga } from 'redux-saga-test-plan';

import { marketBusinessConfigMocks } from '@shared/api/market/businessConfig/index.mock.data';
import { getAllConfigKeyTypePairs } from '@app/pages/Market/BusinessConfig/utils';
import { Creators } from '@app/pages/Market/BusinessConfig/redux/actions'; // '@app/pages/Popup/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMarketBusinessConfigs } from '@shared/api/market/businessConfig';
import { getMarketBusinessConfigsRequest } from '@app/pages/Market/BusinessConfig/redux/saga';

describe('Market Business Config: ', () => {
  const fakeError = new Error('404 Not Found');

  describe('saga #getMarketBusinessConfigsRequest', () => {
    it('should call the getMarketBusinessConfigsRequest (success)', () => {
      testSaga(getMarketBusinessConfigsRequest, { configKeys: getAllConfigKeyTypePairs() })
        .next()
        .call(getMarketBusinessConfigs, { configKeys: getAllConfigKeyTypePairs() })
        .next(marketBusinessConfigMocks)
        .put(Creators.getMarketBusinessConfigsSuccess({ marketBusinessConfigs: marketBusinessConfigMocks }))
        .next()
        .isDone();
    });

    it('should call the getMarketBusinessConfigsRequest (failure)', () => {
      testSaga(getMarketBusinessConfigsRequest, { configKeys: getAllConfigKeyTypePairs() })
        .next()
        .call(getMarketBusinessConfigs, { configKeys: getAllConfigKeyTypePairs() })
        .throw(fakeError)
        .put(Creators.getMarketBusinessConfigsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});

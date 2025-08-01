import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createBadgeRequest } from '@app/pages/MarketProduct/Badge/New/redux/saga';
import { createBadge } from '@shared/api/marketProductBadge';

describe('MarketProduct/Badge/New', () => {
  describe('saga #createBadgeRequest', () => {
    it('should create the new Badge (success)', () => {
      const mockedBadge = {
        name: 'mocked badge',
        description: 'mocked badge description',
        position: 'topLeft',
        domainTypes: [
          1,
          3,
          4,
        ],
      };
      testSaga(createBadgeRequest, { body: { mockedBadge } })
        .next()
        .call(createBadge, { body: { mockedBadge } })
        .next()
        .put(ToastCreators.success())
        .next();
    });
  });
});

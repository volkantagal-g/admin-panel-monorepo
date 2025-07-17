import { testSaga } from 'redux-saga-test-plan';

import { Creators } from './actions';
import { createMarketProductGroupRequest } from './saga';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createMarketProductGroup } from '@shared/api/marketProductGroup';
import { mockedAlgorithmProductGroup, mockedManuelProductGroup } from '@shared/api/marketProductGroup/index.mock.data';

const fakeRequestData = {
  order: 1,
  type: 'manual',
  name: {
    tr: 'example',
    en: 'example',
  },
  placement: 1,
  hierarchy: 'primary',
  abTestVariableName: 'DOMAIN:EXAMPLE:EXAMPLE:EXAMPLE',
  abTestValueId: 'example',
  filterScenarioNames: [],
  domainTypes: [
    1,
  ],
  activeTimes: [
    {
      startMin: 0,
      endMin: 1440,
    },
    {
      startMin: 1440,
      endMin: 2880,
    },
    {
      startMin: 2880,
      endMin: 4320,
    },
    {
      startMin: 4320,
      endMin: 5760,
    },
    {
      startMin: 5760,
      endMin: 7200,
    },
    {
      startMin: 7200,
      endMin: 8640,
    },
    {
      startMin: 8640,
      endMin: 10080,
    },
  ],
};
describe('Market Product Group New Saga', () => {
  describe('saga #createMarketProductGroupRequest', () => {
    it('should call the createMarketProductGroupRequest (success)', () => {
      testSaga(createMarketProductGroupRequest, { body: fakeRequestData })
        .next()
        .call(createMarketProductGroup, { body: fakeRequestData })
        .next(mockedAlgorithmProductGroup)
        .put(ToastCreators.success())
        .next()
        .put(
          Creators.createMarketProductGroupSuccess({ data: mockedAlgorithmProductGroup }),
        )
        .next()
        .isDone();
    });

    it('should call the createMarketProductGroupRequest (fail)', () => {
      const fakeError = new Error('500 Internal Server Error');

      testSaga(createMarketProductGroupRequest, { body: fakeRequestData })
        .next()
        .call(createMarketProductGroup, { body: fakeRequestData })
        .next(mockedManuelProductGroup)
        .throw(fakeError)
        .put(Creators.createMarketProductGroupFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});

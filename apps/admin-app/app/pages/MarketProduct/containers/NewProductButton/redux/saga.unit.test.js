import { testSaga } from 'redux-saga-test-plan';

import { createMarketProduct } from '@shared/api/marketProduct';
import { createMarketProductURLMock } from '@shared/api/marketProduct/index.mock.handler';
import { Creators } from 'pages/MarketProduct/containers/NewProductButton/redux/actions';
import { createMarketProductRequest } from '@app/pages/MarketProduct/containers/NewProductButton/redux/saga';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('Market Product Container', () => {
  describe('saga #createMarketProductRequest', () => {
    const body = {
      type: 1,
      unit: 1,
      name: {
        tr: 'example',
        en: 'example',
      },
      fullName: {
        tr: 'example',
        en: 'example',
      },
      barcodes: [
        '3',
      ],
      domainTypes: [
        1,
      ],
      currency: {
        symbol: '₺',
        codeAlpha: 'TRY',
        codeNumeric: '949',
        isSymbolFirst: true,
      },
    };

    it('should call the createMarketProductRequest (success)', () => {
      testSaga(createMarketProductRequest, { body })
        .next()
        .call(createMarketProduct, { body })
        .next(createMarketProductURLMock.successData)
        .next();
    });
    it('should call the createMarketProductRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(createMarketProductRequest, { body })
        .next()
        .call(createMarketProduct, { body })
        .next({ body })
        .throw(fakeError)
        .put(Creators.createMarketProductFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});

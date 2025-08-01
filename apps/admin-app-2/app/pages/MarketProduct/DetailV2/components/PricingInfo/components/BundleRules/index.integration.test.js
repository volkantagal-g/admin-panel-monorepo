import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { REDUX_KEY } from '@shared/shared/constants';

import { BundleRules } from './index';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const BundleRulesWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <BundleRules />;
};

describe('Market Product/Detail/Pricing Info/BundleRules', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render without errors', async () => {
    await renderComponent({ ui: <BundleRulesWithSaga /> });
  });
});

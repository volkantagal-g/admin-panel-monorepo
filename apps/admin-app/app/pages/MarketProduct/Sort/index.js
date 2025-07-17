import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, ProductSort } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';

import { Creators } from './redux/actions';

const MarketProductSortPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_SORT.name, squad: ROUTE.MARKET_PRODUCT_SORT.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  return (
    <>
      <Header />
      <ProductSort />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.SORT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductSortPage);

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  MarketProductMasterCategoryNewForm,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const MarketProductMasterCategoryNewPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_NEW.name,
    squad: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_NEW.squad,
  });
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
      <MarketProductMasterCategoryNewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.MASTER_CATEGORY.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductMasterCategoryNewPage);

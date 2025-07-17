import { useEffect } from 'react';

import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { SubCategorySort } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import injectReducer from '@shared/utils/injectReducer';

import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const MarketProductSubCategorySortPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_SUB_CATEGORY_SORT.name,
    squad: ROUTE.MARKET_PRODUCT_SUB_CATEGORY_SORT.squad,
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
      <SubCategorySort />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.SUB_CATEGORY.SORT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductSubCategorySortPage);

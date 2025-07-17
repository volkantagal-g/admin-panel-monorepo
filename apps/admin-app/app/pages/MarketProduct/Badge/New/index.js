import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  MarketProductBadgeNewForm,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';

const MarketProductBadgeNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_BADGE_NEW.name, squad: ROUTE.MARKET_PRODUCT_BADGE_NEW.squad });
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
      <MarketProductBadgeNewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.BADGE.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductBadgeNewPage);

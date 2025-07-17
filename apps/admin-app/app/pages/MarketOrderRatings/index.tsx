import { useDispatch } from 'react-redux';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { MarketOrderRatingOptions } from './components';
import { Creators } from './redux/actions';

const reduxKey = REDUX_KEY.GETIR_MARKET_ORDER_RATINGS.RATING_TAGS;

const MarketOrderRatings = () => {
  usePageViewAnalytics({
    name: ROUTE.GETIR_MARKET_ORDER_RATINGS.name,
    squad: ROUTE.GETIR_MARKET_ORDER_RATINGS.squad,
  });
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <MarketOrderRatingOptions />
  );
};

export default MarketOrderRatings;

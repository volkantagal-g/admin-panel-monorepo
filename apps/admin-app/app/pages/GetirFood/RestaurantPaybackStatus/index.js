import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, useInitAndDestroyPage } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import Header from './components/Header';
import Form from './components/Form';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const RestaurantPaybackStatus = () => {
  usePageViewAnalytics({
    name: ROUTE.GETIR_FOOD_RESTAURANT_PAYBACK_STATUS.key,
    squad: ROUTE.GETIR_FOOD_RESTAURANT_PAYBACK_STATUS.squad,
  });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <Form />
    </>
  );
};

const reduxKey = REDUX_KEY.FOOD.RESTAURANT_PAYBACK_STATUS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RestaurantPaybackStatus);

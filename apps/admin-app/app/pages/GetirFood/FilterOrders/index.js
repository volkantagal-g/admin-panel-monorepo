import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Header, GetirFoodFilter, GetirFoodFilterTable } from './components';

const GetirFoodFilterPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.GETIR_FOOD_ORDER_FILTER.name,
    squad: ROUTE.GETIR_FOOD_ORDER_FILTER.squad,
  });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getPaymentMethodsRequest({ includeOnline: true }));
    dispatch(CommonCreators.getCitiesRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <GetirFoodFilter />
      <GetirFoodFilterTable />
    </>
  );
};

const reduxKey = REDUX_KEY.FOOD_ORDER.FILTER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GetirFoodFilterPage);
